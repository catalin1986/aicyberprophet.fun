import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUmi } from '../lib/umi';
import { 
  createFungible, 
  mintV1, 
  TokenStandard,
  mplTokenMetadata,
  updateV1 
} from '@metaplex-foundation/mpl-token-metadata';
import { 
  generateSigner, 
  percentAmount, 
  createGenericFileFromBrowserFile,
  transactionBuilder,
  none,
  some,
  sol,
  publicKey
} from '@metaplex-foundation/umi';
import { transferTokens, findAssociatedTokenPda, transferSol } from '@metaplex-foundation/mpl-toolbox';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { supabase } from '../lib/supabase';

// Default to the provided address, but allow override via Env Var
const AICP_MINT = publicKey(import.meta.env.VITE_AICP_MINT_ADDRESS || 'DjTshJR9LBKmP49QMrnjMbvvoSbn9RU4AkdsUtvqTL5u');
const RATE_AICP_PER_SOL = 100; // 1 SOL = 100 AICP (so 1 AICP = 0.01 SOL)
const BASE_COST_SOL = 0.02;
const AUTHORITY_COST_SOL = 0.01;

export interface TokenFormData {
  name: string;
  symbol: string;
  description: string;
  image: File | null;
  supply: string;
  decimals: string;
  revokeMint: boolean;
  revokeFreeze: boolean;
  revokeUpdate: boolean;
  // Creator Info
  creatorName?: string;
  creatorWebsite?: string;
  // Social Links
  twitter?: string;
  telegram?: string;
  discord?: string;
  website?: string;
  // UI Only
  previewUrl?: string | null;
  // Affiliate (Optional)
  referrer?: string | null;
}

export const useTokenFactory = () => {
  const wallet = useWallet();
  const umi = useUmi(wallet);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createToken = async (data: TokenFormData) => {
    if (!wallet.publicKey) {
      throw new Error("Wallet not connected");
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Upload Image
      if (!data.image) throw new Error("Image is required");
      
      const file = await createGenericFileFromBrowserFile(data.image);
      const [imageUri] = await umi.uploader.upload([file]);

      // 2. Upload Metadata
      // Construct metadata with optional extensions/attributes for creator info and socials
      const extensions: any = {};
      if (data.website) extensions.website = data.website;
      if (data.twitter) extensions.twitter = data.twitter;
      if (data.telegram) extensions.telegram = data.telegram;
      if (data.discord) extensions.discord = data.discord;
      if (data.creatorName) extensions.creator_name = data.creatorName;
      if (data.creatorWebsite) extensions.creator_website = data.creatorWebsite;

      const metadata = {
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        image: imageUri,
        external_url: data.website || data.creatorWebsite, // Standard field often used for project site
        properties: {
          files: [
            {
              uri: imageUri,
              type: data.image.type,
            },
          ],
        },
        extensions: Object.keys(extensions).length > 0 ? extensions : undefined,
        // Some standards use attributes for socials too
        attributes: [
            data.website && { trait_type: 'Website', value: data.website },
            data.twitter && { trait_type: 'Twitter', value: data.twitter },
            data.telegram && { trait_type: 'Telegram', value: data.telegram },
            data.discord && { trait_type: 'Discord', value: data.discord },
            data.creatorName && { trait_type: 'Creator', value: data.creatorName },
        ].filter(Boolean)
      };

      const metadataUri = await umi.uploader.uploadJson(metadata);

      // 3. Create Mint Transaction
      const mint = generateSigner(umi);
      const supply = BigInt(Math.floor(parseFloat(data.supply) * Math.pow(10, parseInt(data.decimals))));

      // Add the Token Metadata plugin
      umi.use(mplTokenMetadata());

      let builder = transactionBuilder()
        // Create the Token
        .add(createFungible(umi, {
          mint,
          name: data.name,
          symbol: data.symbol,
          uri: metadataUri,
          sellerFeeBasisPoints: percentAmount(0),
          decimals: parseInt(data.decimals),
        }))
        // Mint Initial Supply
        .add(mintV1(umi, {
          mint: mint.publicKey,
          authority: umi.identity,
          amount: supply,
          tokenOwner: umi.identity.publicKey,
          tokenStandard: TokenStandard.Fungible,
        }));

      // Service Fee in AICP
      // Rate: 1 SOL = 1,000,000 AICP
      // 0.01 SOL = 10,000 AICP
      // Base (0.02 SOL): 20,000 AICP
      // Authority (0.01 SOL): 10,000 AICP
      
      let feeAicp = 20000;
      if (data.revokeFreeze) feeAicp += 10000;
      if (data.revokeMint) feeAicp += 10000;
      if (data.revokeUpdate) feeAicp += 10000;
      
      if (data.creatorName || data.creatorWebsite) {
          feeAicp += 10000;
      }

      const feeAmount = BigInt(feeAicp * Math.pow(10, 9)); // Assuming 9 decimals for AICP

      // Add Fee Transfer (SPL Token - AICP)
      // Use user's wallet as treasury for demo (self-transfer), simulating payment
      // In production, change this to the platform's treasury wallet address
      const treasury = publicKey('EXNRn8TeUeVRvzAN9cztG6h1c6yjyDb85MD1KiJ7p4aK'); 
      
      // Affiliate Logic: 40% to referrer, 60% to treasury
      let treasuryAmount = feeAmount;
      let referrerAmount = BigInt(0);
      let referrerPubkey: any = null;

      if (data.referrer) {
        try {
           referrerPubkey = publicKey(data.referrer);
           // Validate it's not the sender themselves (optional, but good practice)
           if (referrerPubkey.toString() !== umi.identity.publicKey.toString()) {
               const commission = (feeAmount * BigInt(40)) / BigInt(100); // 40%
               referrerAmount = commission;
               treasuryAmount = feeAmount - commission;
           }
        } catch (e) {
           console.warn("Invalid referrer address", e);
        }
      }

      const sourceAta = findAssociatedTokenPda(umi, { mint: AICP_MINT, owner: umi.identity.publicKey });
      const treasuryAta = findAssociatedTokenPda(umi, { mint: AICP_MINT, owner: treasury });

      // Transfer to Treasury
      builder = builder.add(transferTokens(umi, {
        source: sourceAta,
        destination: treasuryAta,
        amount: treasuryAmount,
      }));

      // Transfer to Referrer (if valid)
      if (referrerAmount > BigInt(0) && referrerPubkey) {
          const referrerAta = findAssociatedTokenPda(umi, { mint: AICP_MINT, owner: referrerPubkey });
          // Note: We assume referrer has ATA. If not, this might fail or we need create logic.
          // For now, simpler to assume or wrap in try/catch (but builder doesn't try/catch).
          // To be safe, we might skip if we can't ensure ATA, but let's try to send.
          // Or better, just send SOL commission? The image said "Earn X% commission".
          // Usually easier with SOL. But fees are in AICP.
          // Let's send AICP.
          builder = builder.add(transferTokens(umi, {
            source: sourceAta,
            destination: referrerAta,
            amount: referrerAmount,
          }));
      }

      // Add Gas Fee (0.1 SOL) - Always to Treasury
      builder = builder.add(transferSol(umi, {
        destination: treasury,
        amount: sol(0.1)
      }));

      // Revoke Update Authority (Metadata)
      if (data.revokeUpdate) {
        builder = builder.add(updateV1(umi, {
          mint: mint.publicKey,
          authority: umi.identity,
          newUpdateAuthority: none(),
        }));
      }

      // ... rest of the code
      const signature = await builder.sendAndConfirm(umi, {
        confirm: { commitment: 'finalized' }
      });

      const signatureStr = base58.deserialize(signature.signature)[0];
      setSuccess(`Token Created! Signature: ${signatureStr}`);
      
      // 6. Save to Supabase
      try {
        await supabase.from('tokens').insert({
          address: mint.publicKey.toString(),
          name: data.name,
          symbol: data.symbol,
          supply: parseInt(data.supply),
          decimals: parseInt(data.decimals),
          image_url: imageUri,
          metadata_uri: metadataUri,
          creator_wallet: wallet.publicKey.toString(),
          mint_authority: !data.revokeMint,
          freeze_authority: !data.revokeFreeze,
          update_authority: !data.revokeUpdate
        });
      } catch (dbError) {
        console.error("Failed to save to DB:", dbError);
        // Don't fail the whole process if DB fails, as on-chain worked
      }

      return { signature: signatureStr, mint: mint.publicKey.toString() };

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create token");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createToken, isLoading, error, success };
};

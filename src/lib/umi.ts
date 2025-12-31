import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { WalletContextState } from '@solana/wallet-adapter-react';

export const useUmi = (wallet: WalletContextState) => {
  // Use Mainnet
  const endpoint = import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
  
  const umi = createUmi(endpoint)
    .use(irysUploader({ address: 'https://node1.irys.xyz' })) // Mainnet Irys node
    .use(walletAdapterIdentity(wallet));

  return umi;
};

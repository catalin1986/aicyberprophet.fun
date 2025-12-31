import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../lib/supabase';

export interface TokenData {
  id: string;
  created_at: string;
  address: string;
  name: string;
  symbol: string;
  supply: number;
  decimals: number;
  image_url: string;
  metadata_uri: string;
  creator_wallet: string;
  mint_authority: boolean;
  freeze_authority: boolean;
  update_authority: boolean;
}

export const useUserTokens = () => {
  const { publicKey } = useWallet();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!publicKey) {
        setTokens([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('tokens')
          .select('*')
          .eq('creator_wallet', publicKey.toString())
          .order('created_at', { ascending: false });

        if (error) throw error;

        setTokens(data || []);
      } catch (err: any) {
        console.error('Error fetching tokens:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [publicKey]);

  return { tokens, isLoading, error };
};

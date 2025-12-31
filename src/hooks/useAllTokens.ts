import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TokenData } from './useUserTokens';

export const useAllTokens = () => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('tokens')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50); // Limit to latest 50 for now

        if (error) throw error;

        setTokens(data || []);
      } catch (err: any) {
        console.error('Error fetching all tokens:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, isLoading, error };
};

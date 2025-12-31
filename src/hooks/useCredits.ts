import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

export interface UserProfile {
  walletAddress: string;
  credits: number;
  tokensCreated: number;
  joinedAt: number;
  rank: 'Novice' | 'Adept' | 'Certified';
}

export const useCredits = () => {
  const { publicKey } = useWallet();
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch credits when wallet connects
  useEffect(() => {
    if (!publicKey) {
      setCredits(0);
      return;
    }

    const fetchCredits = async () => {
      setIsLoading(true);
      try {
        const userRef = doc(db, 'users', publicKey.toString());
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setCredits(userSnap.data().credits || 0);
        } else {
          // Create new user profile if doesn't exist
          await setDoc(userRef, {
            walletAddress: publicKey.toString(),
            credits: 0,
            tokensCreated: 0,
            joinedAt: Date.now(),
            rank: 'Novice'
          });
          setCredits(0);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, [publicKey]);

  // Add credits (called after successful deposit)
  const addCredits = async (amount: number) => {
    if (!publicKey) return;
    try {
      const userRef = doc(db, 'users', publicKey.toString());
      await updateDoc(userRef, {
        credits: increment(amount)
      });
      setCredits(prev => prev + amount);
    } catch (error) {
      console.error("Error adding credits:", error);
      throw error;
    }
  };

  // Deduct credits (called before NFT purchase)
  const deductCredits = async (amount: number) => {
    if (!publicKey) throw new Error("Wallet not connected");
    if (credits < amount) throw new Error("Insufficient credits");

    try {
      const userRef = doc(db, 'users', publicKey.toString());
      await updateDoc(userRef, {
        credits: increment(-amount)
      });
      setCredits(prev => prev - amount);
      return true;
    } catch (error) {
      console.error("Error deducting credits:", error);
      throw error;
    }
  };

  return { credits, isLoading, addCredits, deductCredits };
};

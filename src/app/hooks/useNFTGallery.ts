import { Network, Alchemy, OwnedNft } from 'alchemy-sdk';
import { useState, useEffect } from 'react';

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

export const useNFTGallery = (address: string | undefined) => {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = async () => {
    if (!address) {
      setError('Please connect your wallet');
      return;
    }
    if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
      setError('Contract address not configured');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: [process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS]
      });
      setNfts(response.ownedNfts);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setError('Failed to fetch NFTs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and when address changes
  useEffect(() => {
    fetchNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { nfts, isLoading, error, refetch: fetchNFTs };
};
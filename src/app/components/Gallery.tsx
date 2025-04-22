import { useAccount } from 'wagmi';
import { useNFTGallery } from '../hooks/useNFTGallery';
import Image from 'next/image';
import { Nft } from 'alchemy-sdk';

const Gallery = () => {
  const { address } = useAccount();
  const { nfts, isLoading, error } = useNFTGallery<Nft[]>(address || '');

  if (!address) {
    return (
      <div className="text-center py-8 text-gray-500">
        Connect your wallet to view your NFTs
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">Loading your NFTs...</p>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No NFTs found. Generate and mint some!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {nfts.map((nft) => (
        <div key={nft.tokenId} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
          <div className="relative w-full h-64">
            <Image
              src={nft.media[0]?.gateway || ''}
              alt={nft.title || `NFT #${nft.tokenId}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg">
              {nft.title || `NFT #${nft.tokenId}`}
            </h3>
            {nft.description && (
              <p className="text-sm text-gray-600 mt-2">{nft.description}</p>
            )}
            <div className="mt-3 text-xs text-gray-500">
              Token ID: {nft.tokenId}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
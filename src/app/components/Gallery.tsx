import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useNFTGallery } from '../hooks/useNFTGallery';
import Image from 'next/image';
import { OwnedNft } from 'alchemy-sdk';

const Gallery = () => {
  const { address } = useAccount();
  const { nfts, isLoading, error } = useNFTGallery(address || '');
  const [selectedNFT, setSelectedNFT] = useState<OwnedNft | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!address) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Connect your wallet to view and manage your NFT collection
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading NFTs</h3>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="animate-spin w-12 h-12 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Your NFTs</h3>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch your collection...</p>
      </div>
    );
  }

  const filteredNFTs = nfts.filter(nft => 
    nft.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.tokenId?.toString().includes(searchTerm)
  );

  if (nfts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No NFTs Found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start creating your collection by generating and minting your first NFT!
        </p>
        <a 
          href="#generate" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Your First NFT
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search your NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredNFTs.length} of {nfts.length} NFTs
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNFTs.map((nft) => (
          <div
            key={nft.tokenId}
            onClick={() => setSelectedNFT(nft)}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={nft.image?.cachedUrl || nft.image?.originalUrl || '/placeholder-nft.png'}
                alt={nft.name || `NFT #${nft.tokenId}`}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-nft.png';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 truncate">
                {nft.name || `NFT #${nft.tokenId}`}
              </h3>
              {nft.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {nft.description}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Token ID: {nft.tokenId}</span>
                <span>#{nft.tokenId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedNFT.name || `NFT #${selectedNFT.tokenId}`}
                </h2>
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="relative aspect-square mb-6 rounded-xl overflow-hidden">
                <Image
                  src={selectedNFT.image?.cachedUrl || selectedNFT.image?.originalUrl || '/placeholder-nft.png'}
                  alt={selectedNFT.name || `NFT #${selectedNFT.tokenId}`}
                  fill
                  unoptimized
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-nft.png';
                  }}
                />
              </div>

              {selectedNFT.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedNFT.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Token ID:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedNFT.tokenId}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Contract:</span>
                  <p className="font-medium text-gray-900 dark:text-white truncate">{selectedNFT.contract.address}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={selectedNFT.image?.cachedUrl || selectedNFT.image?.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl text-center font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  View Full Size
                </a>
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
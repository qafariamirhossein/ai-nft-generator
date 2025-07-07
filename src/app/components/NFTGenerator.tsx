import { useState, useRef } from 'react';
import { NFTStorage } from 'nft.storage';
import { useAccount } from 'wagmi';
import { useNFTMint } from '../hooks/useNFTMint';
import Image from 'next/image';
import React from 'react';

const NFTGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { address } = useAccount();
  const { mintNFT } = useNFTMint();
  const [activeTab, setActiveTab] = useState<'generate' | 'upload'>("generate");
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [pastedImageUrl, setPastedImageUrl] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const promptSuggestions = [
    "A magical forest with glowing mushrooms and fairy lights",
    "A futuristic cityscape with flying cars and neon lights",
    "A serene mountain landscape with a crystal clear lake",
    "A steampunk robot with intricate brass details",
    "A cosmic nebula with swirling colors and stars",
    "A cyberpunk street scene with holographic advertisements",
    "A mystical dragon soaring through storm clouds",
    "A peaceful zen garden with cherry blossoms"
  ];

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');
      setSuccess('');
      
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      
      const data = await response.json();
      setImageUrl(data.url);
      setSuccess('Image generated successfully!');
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImageFile(file);
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
      setSelectedImageUrl(url);
      setPastedImageUrl('');
      setImageUrl('');
      setActiveTab('upload');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImageFile(file);
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
      setSelectedImageUrl(url);
      setPastedImageUrl('');
      setImageUrl('');
      setActiveTab('upload');
    }
  };

  const handlePasteUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPastedImageUrl(url);
    setUploadedImageFile(null);
    setUploadedImageUrl('');
    setImageUrl('');
    setSelectedImageUrl(url);
    setActiveTab('upload');
  };

  React.useEffect(() => {
    if (activeTab === 'generate' && imageUrl) {
      setSelectedImageUrl(imageUrl);
    }
    if (activeTab === 'upload' && (uploadedImageUrl || pastedImageUrl)) {
      setSelectedImageUrl(uploadedImageUrl || pastedImageUrl);
    }
  }, [activeTab, imageUrl, uploadedImageUrl, pastedImageUrl]);

  React.useEffect(() => {
    if (imageUrl && activeTab === 'generate') {
      setSelectedImageUrl(imageUrl);
    }
  }, [imageUrl, activeTab]);

  React.useEffect(() => {
    if (uploadedImageUrl && activeTab === 'upload') {
      setSelectedImageUrl(uploadedImageUrl);
    }
  }, [uploadedImageUrl, activeTab]);

  React.useEffect(() => {
    if (pastedImageUrl && activeTab === 'upload') {
      setSelectedImageUrl(pastedImageUrl);
    }
  }, [pastedImageUrl, activeTab]);

  const uploadAndMint = async () => {
    if (!selectedImageUrl || !address) return;

    try {
      setIsUploading(true);
      setError('');
      setSuccess('');
      const nftStorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! });
      let imageBlob: Blob;
      let name = prompt ? `AI Generated NFT - ${prompt}` : 'User Uploaded NFT';
      let description = prompt
        ? `AI-generated artwork created from the prompt: "${prompt}"`
        : 'User uploaded artwork for NFT minting.';
      if (uploadedImageFile && activeTab === 'upload') {
        imageBlob = uploadedImageFile;
      } else {
        const imageRes = await fetch(`/api/fetchImage?url=${encodeURIComponent(selectedImageUrl)}`);
        if (!imageRes.ok) throw new Error('Failed to fetch image from proxy');
        imageBlob = await imageRes.blob();
      }
      const metadata = await nftStorage.store({
        name,
        description,
        image: imageBlob,
        attributes: [
          { trait_type: 'Prompt', value: prompt || 'User Upload' },
          { trait_type: 'Generator', value: imageUrl ? 'DALL-E 3' : 'User Upload' },
          { trait_type: 'Created', value: new Date().toISOString() }
        ],
      });
      await mintNFT(address, metadata.url, prompt || 'User Upload');
      setSuccess('NFT minted successfully! Check your wallet.');
      setImageUrl('');
      setPrompt('');
      setUploadedImageFile(null);
      setUploadedImageUrl('');
      setPastedImageUrl('');
      setSelectedImageUrl('');
    } catch (error: any) {
      console.error('Error uploading and minting:', error);
      let message = 'Failed to mint NFT. Please try again.';
      if (error?.reason) {
        message = error.reason;
      } else if (error?.data?.message) {
        message = error.data.message;
      } else if (error?.message) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      setError(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 dark:text-red-400">{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 dark:text-green-400">{success}</span>
          </div>
        </div>
      )}

      <div className="mb-8 flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'generate' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setActiveTab('generate')}
        >
          AI Generated
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'upload' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload / Link
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input and Generation or Upload/Link */}
        <div className="space-y-6">
          {activeTab === 'generate' ? (
            <>
              {/* Prompt Input */}
              <div className="space-y-4">
                <label htmlFor="prompt" className="block text-lg font-semibold text-gray-900 dark:text-white">
                  Describe Your Artwork
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Describe the artwork you want to generate..."
                  rows={4}
                />
              </div>

              {/* Prompt Suggestions */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Try these prompts:
                </label>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateImage}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </div>
                ) : (
                  'Generate Artwork'
                )}
              </button>
            </>
          ) : (
            <>
              {/* Upload/Link Section */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white">
                  Upload or Paste Image Link
                </label>
                <div
                  className="w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ minHeight: '120px' }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">Drag & drop, click to upload, or paste a link below</span>
                </div>
                <input
                  type="text"
                  placeholder="Paste image URL (e.g. https://...)"
                  value={pastedImageUrl}
                  onChange={handlePasteUrl}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {uploadedImageFile && (
                  <div className="text-sm text-gray-600 dark:text-gray-300">Selected file: {uploadedImageFile.name}</div>
                )}
              </div>
            </>
          )}
          {/* Wallet Status */}
          {!address && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-yellow-700 dark:text-yellow-400">Connect your wallet to mint NFTs</span>
              </div>
            </div>
          )}
        </div>
        {/* Right Column - Image Display and Mint */}
        <div className="space-y-6">
          {selectedImageUrl ? (
            <div className="space-y-4">
              <div className="relative group">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={selectedImageUrl}
                    alt="Selected artwork"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
                  />
                </div>
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-2xl flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={selectedImageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors"
                    >
                      View Full Size
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={uploadAndMint}
                disabled={isUploading || !address}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Minting NFT...
                  </div>
                ) : (
                  'Mint as NFT'
                )}
              </button>
            </div>
          ) : (
            <div className="h-80 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">Your selected artwork will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTGenerator;
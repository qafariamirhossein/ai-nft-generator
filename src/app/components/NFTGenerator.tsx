import { useState } from 'react';
import { NFTStorage } from 'nft.storage';
import { useAccount } from 'wagmi';
import { useNFTMint } from '../hooks/useNFTMint';

const NFTGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { address } = useAccount();
  const { mintNFT } = useNFTMint();

  const generateImage = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadAndMint = async () => {
    if (!imageUrl || !address) return;

    try {
      setIsUploading(true);
      const nftStorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY! });
      
      // Fetch the image and convert to blob
      const imageRes = await fetch(imageUrl);
      const imageBlob = await imageRes.blob();
      
      // Upload to IPFS
      const metadata = await nftStorage.store({
        name: 'AI Generated NFT',
        description: `Generated from prompt: ${prompt}`,
        image: imageBlob,
        attributes: [{ trait_type: 'Prompt', value: prompt }],
      });

      // Mint NFT
      await mintNFT(address, metadata.url, prompt);
    } catch (error) {
      console.error('Error uploading and minting:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium">
          Enter your prompt
        </label>
        <input
          id="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="A magical forest with glowing mushrooms..."
        />
      </div>

      <button
        onClick={generateImage}
        disabled={!prompt || isGenerating}
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </button>

      {imageUrl && (
        <div className="space-y-4">
          <img src={imageUrl} alt="Generated artwork" className="w-full rounded-md" />
          <button
            onClick={uploadAndMint}
            disabled={isUploading || !address}
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isUploading ? 'Minting...' : 'Mint as NFT'}
          </button>
        </div>
      )}
    </div>
  );
};

export default NFTGenerator;
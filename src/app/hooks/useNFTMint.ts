import { useWriteContract, useWalletClient } from 'wagmi';
import AINFT from '../../contracts/NFT.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

export const useNFTMint = () => {
  const { data: walletClient } = useWalletClient();
  const { writeContractAsync } = useWriteContract();

  const mintNFT = async (recipient: string, tokenURI: string, prompt: string) => {
    if (!walletClient || !CONTRACT_ADDRESS) {
      throw new Error('Wallet or contract not initialized');
    }

    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: AINFT.abi,
        functionName: 'mintNFT',
        args: [recipient, tokenURI, prompt],
      });

      return hash;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  };

  return { mintNFT };
};
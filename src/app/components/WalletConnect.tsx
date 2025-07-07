import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect = () => {
  return (
    <div className="text-center">
      <ConnectButton />
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 max-w-md mx-auto">
        Connect your wallet to start creating and minting NFTs. Make sure you&apos;re on the Sepolia testnet!
      </p>
    </div>
  );
};

export default WalletConnect;
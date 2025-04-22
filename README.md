# 🎨 AI NFT Generator

Generate unique AI art and mint it as NFTs on the Ethereum blockchain.

## Features

- 🎨 AI Art Generation using DALL-E
- 🖼️ NFT Minting on Sepolia
- 🌐 IPFS Storage for NFT metadata
- 👛 Web3 Wallet Integration
- 🗃️ NFT Gallery View

## Prerequisites

Before you begin, you'll need:

1. Node.js 18+ installed
2. A crypto wallet (like MetaMask) with some Sepolia ETH
3. The following API keys:
   - WalletConnect Project ID
   - OpenAI API Key
   - NFT.Storage API Key
   - Alchemy API Key
   - Etherscan API Key

## Setup Instructions

1. **Clone and Install**
   ```bash
   git clone https://github.com/yourusername/ai-nft-generator.git
   cd ai-nft-generator
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Copy the example config
   cp config.example.env .env
   ```
   Then edit `.env` and add your API keys:
   ```bash
   # Web3 - Frontend
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=  # from cloud.walletconnect.com
   NEXT_PUBLIC_ALCHEMY_API_KEY=            # from alchemy.com
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=       # after deployment

   # Web3 - Contract Deployment
   PRIVATE_KEY=                            # your wallet private key
   SEPOLIA_RPC_URL=                       # from alchemy.com
   ETHERSCAN_API_KEY=                     # from etherscan.io

   # AI & Storage
   OPENAI_API_KEY=                        # from platform.openai.com
   NEXT_PUBLIC_NFT_STORAGE_KEY=           # from nft.storage
   ```

3. **Deploy Smart Contract**
   ```bash
   # Deploy to Sepolia
   NODE_OPTIONS="--loader ts-node/esm" npx hardhat run scripts/deploy.ts --network sepolia --tsconfig tsconfig.hardhat.json

   # Verify on Etherscan (optional)
   NODE_OPTIONS="--loader ts-node/esm" npx hardhat run scripts/verify.ts --network sepolia --tsconfig tsconfig.hardhat.json
   ```
   Copy the deployed contract address to `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` in your `.env`

4. **Start the App**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Using the App

1. **Connect Wallet**
   - Click the "Connect Wallet" button
   - Select your wallet (MetaMask, etc.)
   - Make sure you're on Sepolia testnet

2. **Generate AI Art**
   - Enter a descriptive prompt
   - Click "Generate" to create AI art
   - Preview the generated image

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

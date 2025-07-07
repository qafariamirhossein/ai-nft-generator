# �� AI NFT Generator

A modern, user-friendly platform for generating AI artwork and minting it as NFTs on the Ethereum blockchain. Built with Next.js, Tailwind CSS, and Web3 technologies.

![AI NFT Generator](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-black?style=for-the-badge&logo=tailwind-css)
![Ethereum](https://img.shields.io/badge/Ethereum-3.1.0-3C3C3D?style=for-the-badge&logo=ethereum)

## ✨ Features

- 🎨 **AI Art Generation** - Create stunning artwork using DALL-E 3
- 🖼️ **NFT Minting** - Mint your AI art as NFTs on Sepolia testnet
- 🌐 **IPFS Storage** - Decentralized storage for NFT metadata
- 👛 **Web3 Integration** - Connect with MetaMask and other wallets
- 🗃️ **NFT Gallery** - View and manage your NFT collection
- 🌙 **Dark Mode** - Beautiful dark/light theme support
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Modern UI/UX** - Smooth animations and intuitive interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- A crypto wallet (MetaMask recommended)
- Sepolia testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### Required API Keys

1. **WalletConnect Project ID** - [Get from WalletConnect Cloud](https://cloud.walletconnect.com/)
2. **OpenAI API Key** - [Get from OpenAI Platform](https://platform.openai.com/)
3. **NFT.Storage API Key** - [Get from NFT.Storage](https://nft.storage/)
4. **Alchemy API Key** - [Get from Alchemy](https://alchemy.com/)
5. **Etherscan API Key** - [Get from Etherscan](https://etherscan.io/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-nft-generator.git
   cd ai-nft-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp config.example.env .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   # Web3 - Frontend
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_deployed_contract_address

   # Web3 - Contract Deployment
   PRIVATE_KEY=your_wallet_private_key
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_alchemy_api_key
   ETHERSCAN_API_KEY=your_etherscan_api_key

   # AI & Storage
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_NFT_STORAGE_KEY=your_nft_storage_key
   ```

4. **Deploy smart contract**
   ```bash
   # Deploy to Sepolia
   NODE_OPTIONS="--loader ts-node/esm" npx hardhat run scripts/deploy.ts --network sepolia --tsconfig tsconfig.hardhat.json
   
   # Copy the deployed contract address to your .env file
   ```

5. **Verify contract (optional)**
   ```bash
   NODE_OPTIONS="--loader ts-node/esm" npx hardhat run scripts/verify.ts --network sepolia --tsconfig tsconfig.hardhat.json
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

### 1. Connect Your Wallet
- Click "Connect Wallet" in the header
- Select your preferred wallet (MetaMask, etc.)
- Ensure you're connected to Sepolia testnet

### 2. Generate AI Art
- Enter a descriptive prompt for your artwork
- Use the provided prompt suggestions for inspiration
- Click "Generate Artwork" to create your AI art
- Wait for the generation to complete

### 3. Mint as NFT
- Review your generated artwork
- Click "Mint as NFT" to create your NFT
- Confirm the transaction in your wallet
- Your NFT will be minted and stored on IPFS

### 4. View Your Collection
- Navigate to the Gallery section
- Browse all your minted NFTs
- Click on any NFT to view details
- Search and filter your collection

## 🛠️ Development

### Project Structure
```
ai-nft-generator/
├── src/
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── api/           # API routes
│   │   └── utils/         # Utility functions
│   ├── contracts/         # Smart contract ABI
│   └── config/           # Configuration files
├── contracts/             # Solidity smart contracts
├── scripts/              # Deployment scripts
└── public/               # Static assets
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Smart Contract
The project uses a custom ERC-721 contract (`AINFT.sol`) with the following features:
- Unique prompt validation
- IPFS metadata storage
- OpenZeppelin standards compliance

## 🎨 Customization

### Styling
The app uses Tailwind CSS with custom design tokens. You can customize:
- Colors in `tailwind.config.js`
- Typography in `globals.css`
- Component styles in individual files

### Adding Features
- **New AI Models**: Modify `/api/generateImage/route.ts`
- **Additional Networks**: Update `wagmi` configuration
- **Custom NFTs**: Extend the smart contract

## 🔧 Troubleshooting

### Common Issues

**"Failed to generate image"**
- Check your OpenAI API key
- Ensure you have sufficient API credits
- Verify the prompt is appropriate

**"Failed to mint NFT"**
- Ensure you're on Sepolia testnet
- Check you have sufficient ETH for gas
- Verify contract address is correct

**"Wallet connection issues"**
- Clear browser cache
- Try a different wallet
- Check WalletConnect project ID

### Getting Help
- Check the [Issues](../../issues) page
- Review the [Discussions](../../discussions)
- Join our [Discord](https://discord.gg/your-server)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for DALL-E 3
- [NFT.Storage](https://nft.storage/) for IPFS storage
- [Alchemy](https://alchemy.com/) for blockchain APIs
- [RainbowKit](https://rainbowkit.com/) for wallet integration
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

- 📧 Email: support@ai-nft-generator.com
- 💬 Discord: [Join our server](https://discord.gg/your-server)
- 🐛 Issues: [Report a bug](../../issues/new)
- 💡 Ideas: [Request a feature](../../issues/new)

---

Made with ❤️ by the AI NFT Generator team

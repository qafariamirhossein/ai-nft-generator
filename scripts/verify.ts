import { run } from "hardhat";

async function main() {
  const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("❌ Contract address not found in environment variables");
    console.log("Please set NEXT_PUBLIC_NFT_CONTRACT_ADDRESS in your .env file");
    process.exit(1);
  }

  console.log("🔍 Verifying contract on Etherscan...");
  console.log("Contract Address:", contractAddress);

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    
    console.log("✅ Contract verified successfully!");
    console.log("🌐 View on Etherscan: https://sepolia.etherscan.io/address/" + contractAddress);
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification script failed:", error);
    process.exit(1);
  });

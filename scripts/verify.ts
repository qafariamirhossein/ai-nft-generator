import { run } from "hardhat";

async function main() {
  const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

  if (!contractAddress) {
    throw new Error("Please set NEXT_PUBLIC_NFT_CONTRACT_ADDRESS in your .env file");
  }

  console.log("Verifying contract...");
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });
  console.log("Contract verified on Etherscan!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

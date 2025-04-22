import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const AINFT = await ethers.getContractFactory("AINFT");
  const ainft = await AINFT.deploy();
  await ainft.waitForDeployment();

  console.log("AINFT deployed to:", await ainft.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

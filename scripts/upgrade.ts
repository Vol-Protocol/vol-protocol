import { ethers, upgrades } from "hardhat";

async function main() {
  let deployer: any;
  try {
    [deployer] = await ethers.getSigners();
  } catch (e) {
    console.log(e);
  }

  const newImplName: string = "";
  const NewImpl: any = await ethers.getContractFactory(newImplName, deployer.address);
  console.log(`Upgrading to ${newImplName}...`);
  await upgrades.upgradeProxy("replace with your proxy address", NewImpl);
  console.log(`VolToken upgraded to:`, newImplName);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

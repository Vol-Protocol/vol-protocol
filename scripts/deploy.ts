import { ethers, upgrades } from "hardhat";

// get the actual value here.
let WETHPriceInDAI30Days: number[] = [
  3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000,
  2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900,
  3000, 2900, 3000, 2900
];

async function main() {
  let deployer: any;
  try {
    [deployer] = await ethers.getSigners();
  } catch (e) {
    console.log(e);
  }

  const VolToken: any = await ethers.getContractFactory("VolToken", deployer.address);
  console.log("Deploying VolToken...");
  const volToken: any = await upgrades.deployProxy(VolToken, [
    "ETH 30 day Vol",
    "vETH30",
    WETHPriceInDAI30Days,
    "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
    false,
    50
  ]);
  await volToken.deployed();
  console.log("VolToken deployed to:", volToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

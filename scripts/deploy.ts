import { ethers, upgrades } from "hardhat";

async function main() {
  let WETHPriceInDAI30Days: number[] = [
    3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900,
    3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900,
    3000, 2900, 3000, 2900, 3000, 2900
  ];

  const VolToken: any = await ethers.getContractFactory("VolToken");
  console.log("Deploying VolToken...");
  const volToken: any = await upgrades.deployProxy(VolToken, [
    "ETH 30 day Vol",
    "ETH30VOL",
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

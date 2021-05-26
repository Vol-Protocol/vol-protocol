import hre, { upgrades } from "hardhat";

async function main() {
  let WETHPriceInDAI30Days = [
    3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900,
    3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900,
    3000, 2900, 3000, 2900, 3000, 2900
  ];

  const VolToken = await hre.ethers.getContractFactory("VolToken");
  console.log("Deploying VolToken...");
  const volToken = await upgrades.deployProxy(VolToken, [
    "ETH 30 day Vol",
    "ETH30VOL",
    WETHPriceInDAI30Days,
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
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

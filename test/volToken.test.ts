import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";

// get the actual value here.
let WETHPriceInDAI30Days: number[] = [
  3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000,
  2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900,
  3000, 2900, 3000, 2900
];

describe("VolToken", async function () {
  let VolToken: any;
  let volToken: any;

  let deployer: any;

  before(async function () {
    try {
      [deployer] = await ethers.getSigners();
    } catch (e) {
      console.log(e);
    }

    VolToken = await ethers.getContractFactory("VolToken", deployer.address);
    console.log("Deploying VolToken...");
    volToken = await upgrades.deployProxy(VolToken, [
      "ETH 30 day Vol",
      "vETH30",
      WETHPriceInDAI30Days,
      "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
      false,
      50
    ]);
    await volToken.deployed();
    console.log("VolToken deployed to:", volToken.address);
  });

  it("...should set the correct initial values", async () => {
    const name: string = await volToken.name();
    const symbol: string = await volToken.symbol();
    const decimals: number = await volToken.decimals();
    const defaultOwner: string = await volToken.owner();
    expect(name).to.eq("ETH 30 day Vol");
    expect(symbol).to.eq("vETH30", "Symbol should equal vETH30");
    expect(decimals).to.eq(18, "Decimals should be 18");
    expect(defaultOwner).to.eq(deployer.address);
  });

  it("check sqrt of 4 ", async function () {
    let sqrtResult: number = await volToken.sqrt(4);
    console.log(`sqrtResult ${sqrtResult}`);
    expect(sqrtResult).to.equal(2);
  });

  it("check volatility ", async function () {
    let vol: number = await volToken.vol();
    console.log(`vol ${vol}`);
    expect(vol).to.equal(50);
  });

  // it("check ????????? ", async function () {
  //   let vol: number = (await volToken.updateVol())
  //   vol = (await volToken.vol())
  //   console.log(`vol ${vol}`)

  //   for (var i = 0; i < 30; i++) {
  //     let price: number = await volToken.price30Days([i])
  //     console.log(',', BigNumber.from(price._hex).toString())
  //   }

  //   expect(vol).to.not.equal(50);

  // });

  it("...shouldn't allow users to mint", async () => {
    const amount = parseEther("1000000");
    await expect(volToken.mint(deployer.address, amount)).to.be.revertedWith(
      "caller is not a vault"
    );
  });

  it("...shouldn't allow users to burn", async () => {
    const amount = parseEther("1000000");
    await expect(volToken.burn(deployer.address, amount)).to.be.revertedWith(
      "caller is not a vault"
    );
  });
});

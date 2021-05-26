const { expect } = require("chai");
const { BigNumber } = require("@ethersproject/bignumber");
let WETHPriceInDAI30Days = [
  3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000,
  2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900, 3000, 2900,
  3000, 2900, 3000, 2900
];

let log = console.log;

describe("VolToken", function () {
  let VolToken;
  let volToken;

  beforeEach(async function () {
    VolToken = await hre.l2ethers.getContractFactory("VolToken");
    console.log("Deploying VolToken...");
    volToken = await upgrades.deployProxy(VolToken, [
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
  });

  it("1. check sqrt of 4 ", async function () {
    let sqrtResult = await volToken.sqrt(4);
    log(`sqrtResult ${sqrtResult}`);
    expect(sqrtResult).to.equal(2);
  });

  it("2. check volitlity ", async function () {
    let vol = await volToken.vol();
    log(`vol ${vol}`);
    expect(vol).to.equal(50);
  });

  // it("3. check ????????? ", async function () {
  //   let vol = (await volToken.updateVol())
  //   vol = (await volToken.vol())
  //   log(`vol ${vol}`)

  //   for (var i = 0; i < 30; i++) {
  //     let price = await volToken.price30Days([i])
  //     console.log(',', BigNumber.from(price._hex).toString())
  //   }

  //   expect(vol).to.not.equal(50);

  // });
});

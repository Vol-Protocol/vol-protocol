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

  let WethToken;
  let wethToken;

  let DaiToken;
  let daiToken;

  beforeEach(async function () {
    VolToken = await ethers.getContractFactory("VolToken");
    volToken = await VolToken.deploy(
      "ETH 30 day Vol",
      "ETH30VOL",
      WETHPriceInDAI30Days,
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
      false,
      50
    );
    await volToken.deployed();

    WethToken = await ethers.getContractFactory("Weth");
    wethToken = await WethToken.deploy("Weth Coin", "WETH");
    await wethToken.deployed();

    console.log("weth address: ", wethToken.address);

    DaiToken = await ethers.getContractFactory("Dai");
    daiToken = await DaiToken.deploy("Dai Coin", "DAI");
    await daiToken.deployed();

    console.log("daiToken address: ", daiToken.address);
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

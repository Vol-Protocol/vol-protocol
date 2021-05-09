const { expect } = require("chai");
let WETHPriceInDAI30Days = [BigNumber.from(2063362201626621683029350036419454),
  BigNumber.from(2132950809502903267508702099005622),
  BigNumber.from(2144689086771792638104640573200408),
  BigNumber.from(2154445806041788906000659003216857),
  BigNumber.from(2294652861105390184979838451124266),
  BigNumber.from(2412634976654123950817262397367216),
  BigNumber.from(2527236277385670653970082990667454),
  BigNumber.from(2472038436678476631348470941078664),
  BigNumber.from(2286283362767919491225592049324371),
  BigNumber.from(2255583657125740491881843941512844),
  BigNumber.from(2092935510313841399653360486763492),
  BigNumber.from(2315700507005653048534082276608857),
  BigNumber.from(2422478906328486332061503765696393),
  BigNumber.from(2310582757226821864066817509848859),
  BigNumber.from(2243869534760915126890912652068514),
  BigNumber.from(224063394189981648358576617968853),
  BigNumber.from(2464497582006628050464174802272948),
  BigNumber.from(2518209137035687246164984911934638),
  BigNumber.from(2696448862088857161638236179892913),
  BigNumber.from(2710712984519120563858027142045058),
  BigNumber.from(2750275843531161304739827658646535),
  BigNumber.from(2822618087806360919593553356348714),
  BigNumber.from(2944770163126250889336125365065719),
  BigNumber.from(3022852551466238129314673753956001),
  BigNumber.from(3254035325244930645022989782781809),
  BigNumber.from(3316321384743482855872669657663701),
  BigNumber.from(3486501583161180755238230148373875),
  BigNumber.from(3435179929730193076027873918336437),
  BigNumber.from(3531685374907868721422363701191746),    
  BigNumber.from(3883876554937052192452773112410584)
  ]
let log = console.log

const { BigNumber } = require("@ethersproject/bignumber");

describe("VolToken", function () {
  let VolToken
  let volToken
  beforeEach(async function () {
    VolToken = await ethers.getContractFactory("VolToken");
    volToken = await VolToken.deploy('ETH 30 day Vol', 'ETH30VOL', WETHPriceInDAI30Days, '0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11', false, 50);
    await volToken.deployed();
  })
  it("1. check sqrt of 4 ", async function () {
    let sqrtResult = (await volToken.sqrt(4))
    log(`sqrtResult ${sqrtResult}`)
    expect(sqrtResult).to.equal(2);
  });

  it("2. check volitlity ", async function () {
    let vol = (await volToken.vol())
    log(`vol ${vol}`)
    expect(vol).to.equal(50);
  });

  it("3. check ????????? ", async function () {
    let vol = (await volToken.updateVol())
    // log(`vol ${(vol)}`)
    vol = (await volToken.vol())
    log(`vol ${vol}`)

    for (var i = 0; i < 30; i++) {
      let price = await volToken.WETHPriceInDAI30Days([i])
      console.log(',', BigNumber.from(price._hex).toString())
    }
    
    expect(vol).to.not.equal(50);

  });
});

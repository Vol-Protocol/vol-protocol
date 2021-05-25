// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface UniswapV2Pair {
    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );
}

contract VolToken is ERC20 {
    uint256[30] public price30Days;
    uint256 public lastUpdatedTimestamp;
    uint256 public vol;
    address public owner;
    address public addr1;
    address public addr2;
    address public uniSwapPairAddress;
    bool public reverse;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256[30] memory _price30Days,
        address _addr1,
        address _addr2,
        address _uniSwapPairAddress,
        bool _reverse,
        uint256 _vol
    ) ERC20(_name, _symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10**uint256(decimals()));
        price30Days = _price30Days;
        owner = msg.sender;
        lastUpdatedTimestamp = block.timestamp;
        addr1 = _addr1;
        addr2 = _addr2;
        uniSwapPairAddress = _uniSwapPairAddress;
        reverse = _reverse;
        vol = _vol;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier checkLastUpdated() {
        //uncomment this when deploying to prod
        // require(
        //     block.timestamp - lastUpdatedTimestamp > 86400000,
        //     "vol was updated less than day ago"
        // );
        // _;

        //use this for testing only
        require(
            block.timestamp - lastUpdatedTimestamp >= 0,
            "vol was updated less than a day ago"
        );
        _;
    }

    function updateVol() public checkLastUpdated {
        (uint256 reserve0, uint256 reserve1, ) =
            UniswapV2Pair(uniSwapPairAddress).getReserves();
        for (uint256 i = 0; i < 30; i++) {
            if (i != 29) {
                price30Days[i] = price30Days[i + 1];
            } else {
                price30Days[29] = reverse
                    ? reserve1 / reserve0
                    : reserve0 / reserve1;
            }
        }

        uint256 mean = 0;
        uint256 sum = 0;
        uint256 varSum = 0;
        uint256 meanDiff = 0;

        for (uint256 i = 0; i < 30; i++) {
            sum = sum + price30Days[i];
        }
        mean = sum / 30;
        console.log("sclog mean: ", mean);

        for (uint256 i = 0; i < 30; i++) {
            meanDiff = price30Days[i] - mean;
            varSum = varSum + meanDiff * meanDiff;
        }
        console.log("sclog varSum: ", varSum);

        uint256 variance = varSum / 30;
        console.log("check log feature: ", variance);
        vol = sqrt(variance);
        lastUpdatedTimestamp = block.timestamp;
    }

    function getVol() public view returns (uint256) {
        return vol;
    }

    function sqrt(uint256 x) public view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}

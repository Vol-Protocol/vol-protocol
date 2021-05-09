require("@eth-optimism/plugins/hardhat/compiler");
require("@eth-optimism/plugins/hardhat/ethers");
require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  networks: {
    optimism: {
      url: process.env.L2_NODE_URL || "http://localhost:8545",
      accounts: {
        mnemonic: process.env.MNEMONIC_WORDS
      },
      gasPrice: 0,
      gas: "auto"
    }
  },
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  }
};

// module.exports = {
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     // spec: "./test/**/*.spec.js",
//     timeout: 2000000
//   },
// };

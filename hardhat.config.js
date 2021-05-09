require("@eth-optimism/hardhat-ovm");
require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  networks: {
    kovan_optimism: {
      url: process.env.KOVAN_OPTIMISM_NODE_ENDPOINT || "http://localhost:8545",
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
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 2000000
  }
};

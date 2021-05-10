require("@eth-optimism/hardhat-ovm");
require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();
//✔ {"address":"0xa995b291ec052fcb2038deae955ffbfad62ff30e","privKey":"96ba137fef1fa8e8c720cdd40cba8699f6ac72766e350e4e930ad7139ec1fc08"}
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
        // url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        // blockNumber: 12274463 // use the same block number to make subsequent runs faster with cache.
      },
      gas: "auto", // gasLimit
      gasPrice: 229000000000, // check the latest gas price market in https://www.ethgasstation.info/
      // inject: false, // optional. If true, it will EXPOSE your mnemonic in your frontend code. Then it would be available as an "in-page browser wallet" / signer which can sign without confirmation.
      accounts: {
        mnemonic: process.env.MNEMONIC_WORDS
      }
    },
    optimism: {
      url: 'http://127.0.0.1:8545',
      accounts: ['96ba137fef1fa8e8c720cdd40cba8699f6ac72766e350e4e930ad7139ec1fc08'],
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      gasPrice: 0,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    }
    // kovan_optimism: {
    //   url: process.env.KOVAN_OPTIMISM_NODE_ENDPOINT || "http://localhost:8545",
    //   accounts: {
    //     mnemonic: process.env.MNEMONIC_WORDS
    //   },
    //   gasPrice: 0,
    //   gas: "auto",
    //   ovm: true
    // }
  },
  solidity: {
    version: "0.7.6",
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

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@openzeppelin/hardhat-defender";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  defender: {
    apiKey: process.env.DEFENDER_TEAM_API_KEY,
    apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY
  },
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
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      // url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      gas: "auto", // gasLimit
      gasPrice: 41000000000, // check the latest gas price market in https://www.ethgasstation.info/
      // inject: false, // optional. If true, it will EXPOSE your mnemonic in your frontend code. Then it would be available as an "in-page browser wallet" / signer which can sign without confirmation.
      accounts: [`0x${process.env.DEPLOYMENT_ACCOUNT_PRIVATE_KEY}`]
    },
    arbitrum_local: {
      url: "http://localhost:8545",
      accounts: [
        "96ba137fef1fa8e8c720cdd40cba8699f6ac72766e350e4e930ad7139ec1fc08"
      ],
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      gasPrice: 0
    },
    arbitrum_kovan: {
      url: process.env.KOVAN_ARBITRUM_NODE_ENDPOINT,
      chainId: 212984383488152,
      gasPrice: 20000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC_WORDS
      },
      gas: "auto"
    },
    arbitrum: {
      url: "",
      accounts: [
        "96ba137fef1fa8e8c720cdd40cba8699f6ac72766e350e4e930ad7139ec1fc08"
      ],
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      gasPrice: 0
    }
  },
  solidity: {
    version: "0.8.0",
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
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;

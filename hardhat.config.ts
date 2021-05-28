import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@openzeppelin/hardhat-defender";
import dotenv from "dotenv";
dotenv.config();

const defenderApiKey = process.env.DEFENDER_TEAM_API_KEY as string;
const defenderApiSecret = process.env.DEFENDER_TEAM_API_SECRET_KEY as string;
const alchemyKey = process.env.ALCHEMY_API_KEY as string;
const infuraKey = process.env.INFURA_API_KEY as string;
const mnemonic = process.env.MNEMONIC_WORDS as string;
const deploymentPrivateKey = process.env
  .DEPLOYMENT_ACCOUNT_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  defender: {
    apiKey: defenderApiKey,
    apiSecret: defenderApiSecret
  },
  defaultNetwork: "optimism_local",
  networks: {
    optimism_local: {
      url: "http://localhost:8545",
      accounts: [
        "96ba137fef1fa8e8c720cdd40cba8699f6ac72766e350e4e930ad7139ec1fc08"
      ],
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      gasPrice: 0,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    },
    optimism_kovan: {
      url: process.env.KOVAN_OPTIMISM_NODE_ENDPOINT,
      accounts: {
        mnemonic: mnemonic
      },
      gasPrice: 0,
      gas: "auto",
      ovm: true
    },
    optimism: {
      url: "",
      accounts: [
        "96ba137fef1fa8e8c720cdd40cba8699f6ac72766e350e4e930ad7139ec1fc08"
      ],
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      gasPrice: 0,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
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
    apiKey: process.env.ETHERSCAN_API_KEY as string
  }
};

export default config;

declare namespace NodeJS {
  export interface ProcessEnv {
    DEFENDER_TEAM_API_KEY: string;
    DEFENDER_TEAM_API_SECRET_KEY: string;
    ALCHEMY_API_KEY: string;
    INFURA_API_KEY: string;
    DEPLOYMENT_ACCOUNT_PRIVATE_KEY: string;
    MNEMONIC_WORDS: string;
    ETHERSCAN_API_KEY: string;
    KOVAN_ARBITRUM_NODE_ENDPOINT: string;
  }
}

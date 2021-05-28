## Initial setup

1. Set up your `.env` environment file.

2. Install dependencies.

```
npm install
```

## Instructions to Test on mainet fork

1. On a seprate terminal

```
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/XXXXXXXXXXXX
```

2. Put Uniswap Pair address for WETHDAI pair, weth address, dai address, 30day prices, volatility at the time of testing/deployment in `scripts/deploy.js` and `test/sample-test.js`

3. Test smart contracts
   compile

```
npx hardhat compile
```

then test

```
npm run test:fork
```

4. deploy smart contracts

```
npx hardhat compile
```

```
npm run deploy:fork
```

```
npx hardhat run scripts/deploy.js --network localhost
```

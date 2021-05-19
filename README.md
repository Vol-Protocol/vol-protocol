## Instructions to Test on mainet fork or optimism local node

0.

```
npm install && npm i -g  hardhat
```

1. On a seprate terminal

```
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/XXXXXXXXXXXX
```

for optimism

```
cd optimism
yarn install
yarn build
cd ops
docker-compose build
docker-compose up
```

2. Put Uniswap Pair address for WETHDAI pair, weth address, dai address, 30day prices, volitility at the time of testing/deployment in `scripts/deploy.js` and `test/sample-test.js`

NOTE:

for optimsim first deploy the uniswap factory and pair contracts (TODO)

3. Test smart contracts
   compile

```
npx hardhat compile
```

or

```
npx hardhat --network optimism compile
```

then test

```
npm run test:fork
```

or

```
npm run test:optimism
```

4. deploy smart contracts

```
npx hardhat compile
```

or

```
npx hardhat --network optimism compile
```

```
npm run deploy:fork
```

or

```
npm run deploy:optimism
```

```
npx hardhat run scripts/deploy.js --network localhost
```

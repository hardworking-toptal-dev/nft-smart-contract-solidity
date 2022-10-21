

1 . Clone this repo:

```sh
g
```

2 . Change into the directory:

```sh
cd hardhat-nft-smart-contract
```

3 . Install dependencies:

```sh
npm install
```

4 . Set up environment variables:

```sh
cp .env.example .env
```

Replace the values of the variables you need in the `.env` file with yours.

5 . Set up `project-config.ts`:

- Replace the file paths with yours
- Replace `hiddenMetadataUri` with yours

## Commands

### Test

```sh
npx hardhat test
```

### Deploy

1 . `Network: hardhat(default)`:

```sh
npx hardhat deploy
```

2 . `Network: localhost`:

```sh
npx hardhat node
```

Launch another terminal and run the following command:

```sh
npx hardhat deploy --network localhost
```

3 . `Network: rinkeby/mainnet/mumbai/polygon`:

```sh
npx  deploy --network <networkName>
```

4 . `Tags`:

Deploying without the `--tags <tags>` option runs all deploy scripts in the `deploy` directory.

For example, if you want to run only `deploy/02-update-front-end.ts` using the `rinkeby` network:

```sh
npx hardhat deploy --network rinkeby --tags updateFrontEnd
```

> The tag name is set at the bottom of the deploy script file.

> Using Hardhat Network and running only `deploy/02-update-front-end.ts` will result in an error.

### Scripts

1 . Open allowlist sale:

```sh
npm run open-allowlist -- --network <networkName>
```

2 . Open public sale:

```sh
npm run open-public -- --network <networkName>
```

3 . Close sales:

```sh
npm run close -- --network <networkName>
```

4 . Reveal collection:

```sh
npm run reveal -- --network <networkName>
```



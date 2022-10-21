import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import * as dotenv from 'dotenv'

import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
import 'hardhat-deploy'
import 'solidity-coverage'

import { allowlist } from './project-config'

dotenv.config()

task(
  'proof',
  'Generates and prints a proof for the given address (must be in the allowlist)',
  async (taskArgs: { address: string }) => {
    const leafNodes = allowlist.map((address: string) => keccak256(address))
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    })
    const proof = merkleTree.getHexProof(keccak256(taskArgs.address)).toString()

    console.log(`The proof of the address is: ${proof}`)
  }
).addPositionalParam('address', 'The given address')

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL


const GOERLI_TESTNET_RPC_URL = process.env.GOERLI_TESTNET_RPC_URL

const MUMBAI_TESTNET_RPC_URL =
  process.env.MUMBAI_TESTNET_RPC_URL || 'https://rpc-mumbai.matic.today'

const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL || 'https://polygon-rpc.com'

const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY

const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || 'YOUR_ETHERSCAN_API_KEY'

const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || 'YOUR_POLYGONSCAN_API_KEY'

const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY

const REPORT_GAS = process.env.REPORT_GAS || false

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    // MetaMask chainId issue: https://hardhat.org/metamask-issue
    hardhat: {
      // chainId: 31337,
      chainId: 1337,
    },
    localhost: {
      // chainId: 31337,
      chainId: 1337,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL || '',
      accounts:
        TESTNET_PRIVATE_KEY !== undefined ? [`0x${TESTNET_PRIVATE_KEY}`] : [],
      chainId: 4,
    },
    mainnet: {
      url: MAINNET_RPC_URL || '',
      accounts:
        MAINNET_PRIVATE_KEY !== undefined ? [`0x${MAINNET_PRIVATE_KEY}`] : [],
      chainId: 1,
    },
    mumbai: {
      url: MUMBAI_TESTNET_RPC_URL,
      accounts:
        TESTNET_PRIVATE_KEY !== undefined ? [`0x${TESTNET_PRIVATE_KEY}`] : [],
      chainId: 80001,
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      accounts:
        MAINNET_PRIVATE_KEY !== undefined ? [`0x${MAINNET_PRIVATE_KEY}`] : [],
      chainId: 137,
    },
    goerli: {
      url: GOERLI_TESTNET_RPC_URL,
      accounts:
        TESTNET_PRIVATE_KEY !== undefined ? [`0x${TESTNET_PRIVATE_KEY}`] : [],
      chainId: 5,
    },

   

    
  },
  gasReporter: {
    enabled: REPORT_GAS as boolean,
    currency: 'USD',
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    outputFile: 'gas-report.txt',
    noColors: true,
  },
  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
      polygonMumbai: "FVR5F9PXRIXEAVC2ND9T9U1TXB5HE28JMU",
      goerli: "V9GTAUWP7DTXPB7IFVDGYPZUHVM5MHCF38",
      polygonMainnet: POLYGONSCAN_API_KEY,
    },
  },
  contractSizer: {
    alphaSort: true,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
}

export default config

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers, network, run } from 'hardhat'

import { contractConfig, hiddenMetadataUri } from '../project-config'
import {
  developmentChains,
  WAIT_BLOCK_CONFIRMATIONS,
} from '../helper-hardhat-config'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const contractName = contractConfig.contractName

  const args = [
    contractConfig.nftName,
    contractConfig.nftSymbol,
    hiddenMetadataUri,
    contractConfig.maxSupply,
    ethers.utils.parseEther(contractConfig.saleType.allowlistSale.mintPrice),
    contractConfig.saleType.allowlistSale.maxMintAmountPerTx,
  ]

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : WAIT_BLOCK_CONFIRMATIONS

  const myNftCollection = await deploy(contractName, {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  // Verify the deployment
  // If you use Polygon: process.env.POLYGONSCAN_API_KEY
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log('Verifying contract...')

    try {
      await run('verify:verify', {
        address: myNftCollection.address,
        contract: `contracts/${contractName}.sol:${contractName}`,
        constructorArguments: args,
      })
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.toLowerCase().includes('already verified')
      ) {
        console.log('Already verified!')
      } else {
        console.log(error)
      }
    }
  }
}
export default func
func.tags = ['MyNftCollection']

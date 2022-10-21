import { ethers } from 'hardhat'

import { contractConfig } from '../project-config'

async function main() {
  const contract = await ethers.getContract(contractConfig.contractName)

  if ((await contract.getSaleState()) !== 0) {
    console.log('Closing sales...')

    // Close sales
    await (await contract.setClosed()).wait()
  }

  console.log('Sales are now closed!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

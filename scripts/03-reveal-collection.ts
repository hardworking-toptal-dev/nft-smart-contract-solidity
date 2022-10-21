import { ethers } from 'hardhat'

import { contractConfig } from '../project-config'

async function main() {
  if (
    !process.env.METADATA_URI ||
    process.env.METADATA_URI === '' ||
    process.env.METADATA_URI === 'ipfs://__CID___/'
  ) {
    const message =
      'Please add the metadata URI of your collection to the .env file.'

    throw new Error(`\x1b[31m${message}\x1b[0m`)
  }

  const contract = await ethers.getContract(contractConfig.contractName)

  if ((await contract.getBaseUri()) !== process.env.METADATA_URI) {
    console.log(`Updating the metadata URI to: ${process.env.METADATA_URI}`)

    // Update base URI
    await (await contract.setBaseUri(process.env.METADATA_URI)).wait()
  }

  if (!(await contract.getRevealed())) {
    console.log('Revealing your collection...')

    // Reveal collection
    await (await contract.setRevealed(true)).wait()
  }

  console.log('Your collection is now revealed!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

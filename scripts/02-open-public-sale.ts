import { ethers } from 'hardhat'

import { contractConfig } from '../project-config'

async function main() {
  const contract = await ethers.getContract(contractConfig.contractName)

  const publicMintPrice = contractConfig.saleType.publicSale.mintPrice
  const publicMintPriceWei = ethers.utils.parseEther(publicMintPrice)
  const publicMintAmount = contractConfig.saleType.publicSale.maxMintAmountPerTx

  if (!(await contract.getMintPrice()).eq(publicMintPriceWei)) {
    console.log(
      `Updating the mint price to ${publicMintPrice} ${contractConfig.gasToken}...`
    )

    // Update mint price
    await (await contract.setMintPrice(publicMintPriceWei)).wait()
  }

  if (!(await contract.getMaxMintAmountPerTx()).eq(publicMintAmount)) {
    console.log(`Updating the max mint amount to ${publicMintAmount} per Tx...`)

    // Update max mint amount per Tx
    await (await contract.setMaxMintAmountPerTx(publicMintAmount)).wait()
  }

  if ((await contract.getSaleState()) !== 2) {
    console.log('Opening public sale...')

    // Open public sale
    await (await contract.setPublicOpen()).wait()
  }

  console.log('Public sale is now open!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

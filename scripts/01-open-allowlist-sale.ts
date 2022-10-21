import { ethers } from 'hardhat'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

import { contractConfig, allowlist } from '../project-config'

async function main() {
  if (allowlist.length < 1) {
    const message = 'Allowlist is empty!'

    throw new Error(`\x1b[31m${message}\x1b[0m`)
  }

  const contract = await ethers.getContract(contractConfig.contractName)

  // Construct Merkle Tree
  const leafNodes = allowlist.map((address: string) => keccak256(address))
  const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
  })
  const latestRootHash = merkleTree.getHexRoot()

  if ((await contract.getMerkleRoot()) !== latestRootHash) {
    console.log(`Updating the root hash to: ${latestRootHash}`)

    // Update root hash
    await (await contract.setMerkleRoot(latestRootHash)).wait()
  }

  const allowlistMintPrice = contractConfig.saleType.allowlistSale.mintPrice
  const allowlistMintPriceWei = ethers.utils.parseEther(allowlistMintPrice)
  const allowlistMintAmount =
    contractConfig.saleType.allowlistSale.maxMintAmountPerTx

  if (!(await contract.getMintPrice()).eq(allowlistMintPriceWei)) {
    console.log(
      `Updating the mint price to ${allowlistMintPrice} ${contractConfig.gasToken}...`
    )

    // Update mint price
    await (await contract.setMintPrice(allowlistMintPriceWei)).wait()
  }

  if (!(await contract.getMaxMintAmountPerTx()).eq(allowlistMintAmount)) {
    console.log(
      `Updating the max mint amount to ${allowlistMintAmount} per Tx...`
    )

    // Update max mint amount per Tx
    await (await contract.setMaxMintAmountPerTx(allowlistMintAmount)).wait()
  }

  if ((await contract.getSaleState()) !== 1) {
    console.log('Opening allowlist sale...')

    // Open allowlist sale
    await (await contract.setAllowlistOnly()).wait()
  }

  console.log('Allowlist sale is now open!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

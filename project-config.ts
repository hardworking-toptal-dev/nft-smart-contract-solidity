import fs from 'fs'

const frontEndAbiFile = '../hardhat-nft-smart-contract-main/abi.json'

const frontEndContractConfigFile =
  '../hardhat-nft-smart-contract-main/contract-config.json'

const contractConfig = JSON.parse(
  fs.readFileSync(frontEndContractConfigFile, 'utf8')
)
const hiddenMetadataUri = 'ipfs://QmW6YKq1MjKzTDNNXMQSQaDyms8PSfJS7cDWBkc92NZc84'

const frontEndAllowlistFile = '../hardhat-nft-smart-contract-main/allowlist.json'

const allowlist = JSON.parse(fs.readFileSync(frontEndAllowlistFile, 'utf8'))

export {
  frontEndAbiFile,
  frontEndContractConfigFile,
  contractConfig,
  hiddenMetadataUri,
  allowlist,
}

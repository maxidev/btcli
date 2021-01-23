const { getExplorer } = require('./explorer');
const terminalLink = require('terminal-link');

const explorer = getExplorer();

function getAddressUrl(address) {
  return terminalLink(address, `${explorer.url}${explorer.address}${address}`);
}

function getBlockUrl(blockhash) {
  return terminalLink(blockhash, `${explorer.url}${explorer.block}${blockhash}`);
}

function getTransactionUrl(txid) {
  return terminalLink(txid, `${explorer.url}${explorer.tx}${txid}`);
}

module.exports = {
  getAddressUrl,
  getBlockUrl,
  getTransactionUrl
};
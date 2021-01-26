const { getServer } = require('./args');

const SERVERS = {
  blockchair: {
    address: '/address/',
    block: '/block/',
    id: 'blockchair',
    tx: '/transaction/',
    url: 'https://blockchair.com/bitcoin'
  },
  'blockchain-info': {
    address: '/address/',
    block: '/block/',
    id: 'blockchain-info',
    tx: '/tx/',
    url: 'https://www.blockchain.com/btc'
  },
  blockstream: {
    address: '/address/',
    block: '/block/',
    id: 'blockstream',
    tx: '/tx/',
    url: 'https://blockstream.info',
    block: '/block/'
  },
  btc: {
    address: '/address/',
    block: '/block/',
    id: 'btc',
    tx: '/transaction/',
    url: 'https://explorer.btc.com/btc'
  }
};

function getExplorer() {
  const server = getServer();

  return SERVERS[server];
}

module.exports = {
  getExplorer
};

const { getServer, isTestnet } = require('./args');
const isEmpty = require('lodash/isEmpty');

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
const TESTNET_SERVERS = {
  blockchair: {
    address: '/address/',
    block: '/block/',
    id: 'blockchair',
    tx: '/transaction/',
    url: 'https://blockchair.com/bitcoin/testnet'
  },
  'blockchain-info': {
    address: '/address/',
    block: '/block/',
    id: 'blockchain-info',
    tx: '/tx/',
    url: 'https://www.blockchain.com/btc-testnet'
  },
  blockstream: {
    address: '/address/',
    block: '/block/',
    id: 'blockstream',
    tx: '/tx/',
    url: 'https://blockstream.info/testnet',
    block: '/block/'
  }
};

function getExplorer() {
  const server = getServer();

  if (isTestnet()) {
    const testnetServer = TESTNET_SERVERS[server];

    if (isEmpty(testnetServer)) {
      const availableTestnetServers = Object.keys(TESTNET_SERVERS);

      console.log(`Available servers to use with testnet are: ${availableTestnetServers.join(', ')}.`);
      process.exit(0);
    }

    return testnetServer;
  }

  return SERVERS[server];
}

module.exports = {
  getExplorer
};

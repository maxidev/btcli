
const SERVERS = [
  {
    id: 'blockchair',
    url: 'https://blockchair.com/bitcoin',
    address: '/address/',
    tx: '/transaction/',
    block: '/block'
  },
  {
    id: 'blockchain-info',
    url: 'https://www.blockchain.com/btc',
    address: '/address/',
    tx: '/tx/',
    block: '/block/'
  },
    {
    id: 'blockstream',
    url: 'https://blockstream.info',
    address: '/address/',
    tx: '/tx/',
    block: '/block/'
  },
  {
    id: 'btc',
    url: 'https://explorer.btc.com/btc',
    address: '/address/',
    tx: '/transaction/',
    block: '/block/'
  }
];

let SERVER;

function setExplorer (_explorer){
  switch (_explorer) {
    case 'blockchair':
      SERVER = SERVERS[0];
      break;
    case 'blockchain-info':
      SERVER = SERVERS[1];
      break;
    case 'blockstream':
      SERVER = SERVERS[2];
      break;
    case 'btc':
      SERVER = SERVERS[3];
      break;
    default:
      SERVER = SERVERS[0];
      break;
  }
}

function transactions(_hash,) {
  let txString = SERVER.url + SERVER.tx + _hash;
  return txString;
};

function address(_address){
  let addrString = SERVER.url + SERVER.address + _address;
  return addrString;
};

function blocks(_block){
  let blockString = SERVER.url + SERVER.block + _address;
  return blockString;
};


module.exports = {
  setExplorer: setExplorer,
  addr: address,
  tx: transactions,
  block: blocks
};
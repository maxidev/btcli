const { getServer, isTestnet } = require('./args');
const ElectrumClient = require('@codewarriorr/electrum-client-js');
const servers = require('../servers.json');
const ora = require('ora');
const spinner = ora();
spinner.spinner = 'squareCorners';

async function connect() {
  // Public Electrum server list: https://1209k.com/bitcoin-eye/ele.php?chain=btc
  // TODO: add a method to try to connect to another server if first one fails
  try {
    const { url, port, proto } = isTestnet() ? servers.TESTNET : servers.BAREMETALPITTSBURGH;
    const client = new ElectrumClient(url, port, proto);
    spinner.start();
    await client.connect();
  
    console.log('------------------------------------------------');
    spinner.clear();
    spinner.stop();
    return client;  
  } catch (error) {
    console.log(error);    
  }
}

module.exports = connect;

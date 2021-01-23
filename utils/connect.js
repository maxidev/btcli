const ElectrumClient = require('@codewarriorr/electrum-client-js');
const servers = require('../servers.json');

async function connect() {
  // Public Electrum server list: https://1209k.com/bitcoin-eye/ele.php?chain=btc
  // TODO: add a method to try to connect to another server if first one fails
  const client = new ElectrumClient(
    servers.BAREMETALPITTSBURGH.url,
    servers.BAREMETALPITTSBURGH.port,
    servers.BAREMETALPITTSBURGH.proto
  );

  await client.connect();

  log('-------------------------');

  return client;
}

module.exports = connect;
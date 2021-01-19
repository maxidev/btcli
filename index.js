const ElectrumClient = require('@codewarriorr/electrum-client-js')
const bitcoin = require('bitcoinjs-lib');
const { program } = require('commander');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const axios = require('axios');

const log = console.log;


program
  .description('BTCli - A simple command line Bitcoin explorer')
  .version('0.0.1', '-v, --vers', 'output the current version')
  .option('-addr, --address <addr>', 'Bitcoin Address to check legacy/bech32 supported')
  //.option('-i, --history ', 'Get',)
  .option('-V, --verbose', 'verbose output')
  .option('-tx, --transaction <tx>', 'tx');

program.parse();

if(Object.keys(program.opts()).length == 0 )
  program.help();


async function main () {
  const options = program.opts();

    try {

    const client = new ElectrumClient(
        'electrum1.baremetalpittsburgh.net',
        50002,
        'ssl'
      )

    await client.connect();

    console.log("-------------------------");
    //console.log(options);

    let addr = options.address;

    let script = bitcoin.address.toOutputScript(addr)
    let hash = bitcoin.crypto.sha256(script)
    let reversedHash = new Buffer.from(hash.reverse())

    let rScriptHash = reversedHash.toString('hex');

    console.log("Address: ",  terminalLink(addr, `https://blockchair.com/bitcoin/address/${addr}`));

    let history;
    if(options.verbose){
      console.log("Script: ", script[1]);
      console.log("Script: ", script.toString('hex'));
      console.log("Electrum reversed script_hash: ", rScriptHash);
      history = await client.blockchain_scripthash_getHistory(rScriptHash);
    }

    let balance = await client.blockchain_scripthash_getBalance(rScriptHash)
    let UTXOs = await client.blockchain_scripthash_listunspent(rScriptHash);
    
    
    let btcBalance = balance.confirmed/100000000;
    let btcPrice = (await axios.get('https://blockchain.info/q/24hrprice')).data;
    
    console.log('\nBalance:', chalk.green(btcBalance + `BTC (~ ${(btcBalance*btcPrice).toFixed(2)} USD)`));
    
    console.log(`UTXOs (${UTXOs.length})`);
    UTXOs.forEach(utxo => {
        console.log("Hash: ", terminalLink(utxo.tx_hash, `https://blockchair.com/bitcoin/transaction/${utxo.tx_hash}`));
        console.log("Value:", chalk.blue(utxo.value / 100000000 + " BTC "));
    })

    if(history){
      console.log("Transaction History")
      history.forEach(h=> {
        log("TX ID:", terminalLink(h.tx_hash, `https://blockchair.com/bitcoin/transaction/${h.tx_hash}`));
      })
    }

    await client.close()
    
  } catch (err) {
      console.error(err);
  }
}

main()
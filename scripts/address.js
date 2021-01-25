const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const connect = require('../utils/connect');
const addrUtils = require('../utils/address');
const explorer = require('../utils/explorer');
const ora = require('ora');

/* 
  Spinner style config
*/ 
const spinner = ora();
spinner.spinner = 'squareCorners';

async function address(address, options) {
  try {

    if(!addrUtils.isValid(address))
      throw new Error("Wrong address / Invalid format");
    
    const client = await connect();


    if(options.explorer)
      explorer.setExplorer(options.explorer);
    else
      explorer.setExplorer('blockchair');

    let script = bitcoin.address.toOutputScript(address);

    let hash = bitcoin.crypto.sha256(script);

    let reversedHash = new Buffer.from(hash.reverse());

    let rScriptHash = reversedHash.toString('hex');

    let decompiledScript = bitcoin.script.decompile(script);
    
    log('Address:', chalk.magentaBright(terminalLink(address, explorer.addr(address))));

    log('Type:', chalk.white(terminalLink(addrUtils.getType(address))));

    log('ASM:', chalk.blue(bitcoin.script.toASM(script)));

    if (options.verbose) {
      log('Script:', chalk.blue(script.toString('hex')));
      log('Decompiled script:', decompiledScript);
      log('Reversed Script (for Electrum):', chalk.blue(rScriptHash));
    }

    spinner.start();
    let balance = await client.blockchain_scripthash_getBalance(rScriptHash)

    const BTC_UNIT = 100000000;
    let btcPrice = 0;

    let btcBalance = balance.confirmed / BTC_UNIT;

    /*
      Query for USD balance only if balance var shows value greather than 0
    */
    if(balance.confirmed > 0)
      btcPrice = (await axios.get('https://blockchain.info/q/24hrprice')).data;

    spinner.stop();
    spinner.clear();

    log('Balance:', chalk.green(btcBalance + ` BTC (~ ${(btcBalance * btcPrice).toFixed(2)} USD)`));
    
    if (options.verbose) {
      spinner.start();
      let UTXOs = await client.blockchain_scripthash_listunspent(rScriptHash);
      spinner.clear();
      log(`UTXO(s) (${UTXOs.length})`);
      UTXOs.forEach(utxo => {
        log('Hash: ', terminalLink(utxo.tx_hash, explorer.tx(utxo.tx_hash)));
        log('Value:', chalk.blue(utxo.value / BTC_UNIT + ' BTC '));
      });

      let history = await client.blockchain_scripthash_getHistory(rScriptHash);
      spinner.clear();

      log(`Transaction History (${history.length})`)

      history.forEach(h => {
        log('ID:', terminalLink(h.tx_hash, explorer.tx(h.tx_hash)));
      })
      spinner.stop();
    }

    await client.close();
  } catch (err) {
    log(chalk.red(err));
  }
}

module.exports = address;
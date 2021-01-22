const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const ora = require('ora');

async function address(client, options) {
  try {
    const spinner = ora();
    spinner.spinner = "squareCorners";
    

    let addr = options.address;

    let script = bitcoin.address.toOutputScript(addr);

    let hash = bitcoin.crypto.sha256(script);

    let reversedHash = new Buffer.from(hash.reverse());

    let rScriptHash = reversedHash.toString('hex');

    let decompiledScript = bitcoin.script.decompile(script);

    log("Address: ", chalk.magentaBright(terminalLink(addr, `https://blockchair.com/bitcoin/address/${addr}`)));

    if (decompiledScript[0] == 0)
      log("Address Type: ", chalk.white("SegWit (Bech32/P2WPKH)"));
    else if (addr[0] == 1)
      log("Address Type: ", chalk.white("Legacy (P2PKH)"));
    else if (addr[0] == 3)
      log("Address Type: ", chalk.white("P2SH / Nested Segwit"));

    log("ScriptHash: ", chalk.blue(bitcoin.script.toASM(script)));

    if (options.verbose) {

      let arr = [...script];
      console.log("Electrum reversed script_hash: ", rScriptHash);
    }

    spinner.start();
    let balance = await client.blockchain_scripthash_getBalance(rScriptHash)

    const BTC_UNIT = 100000000;

    let btcBalance = balance.confirmed / BTC_UNIT;
    let btcPrice = (await axios.get('https://blockchain.info/q/24hrprice')).data;
    
    spinner.stop();
    spinner.clear();
    
    log('Balance:', chalk.green(btcBalance + ` BTC (~ ${(btcBalance * btcPrice).toFixed(2)} USD)`));

    if (options.verbose) {

      let UTXOs = await client.blockchain_scripthash_listunspent(rScriptHash);
      log(`UTXOs (${UTXOs.length})`);
      UTXOs.forEach(utxo => {
        log("Hash: ", terminalLink(utxo.tx_hash, `https://blockchair.com/bitcoin/transaction/${utxo.tx_hash}`));
        log("Value:", chalk.blue(utxo.value / BTC_UNIT + " BTC "));
      });

      log("Transaction History")
      let history = await client.blockchain_scripthash_getHistory(rScriptHash);
      history.forEach(h => {
        log("TX ID:", terminalLink(h.tx_hash, `https://blockchair.com/bitcoin/transaction/${h.tx_hash}`));
      })
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = address;
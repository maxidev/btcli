const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const ora = require('ora');

const INFO = {
  SEGWIT: "https://en.bitcoin.it/wiki/BIP_0173",
  NESTED_SEGWIT: "",
  MULTISIG: "",
  TIMELOCK: ""
};

async function address(client, address, options) {
  try {

    const spinner = ora();
    spinner.spinner = "squareCorners";

    let script = bitcoin.address.toOutputScript(address);

    let hash = bitcoin.crypto.sha256(script);

    let reversedHash = new Buffer.from(hash.reverse());

    let rScriptHash = reversedHash.toString('hex');

    let decompiledScript = bitcoin.script.decompile(script);

    log("Address: ", chalk.magentaBright(terminalLink(address, `https://blockchair.com/bitcoin/address/${address}`)));

    if (decompiledScript[0] == 0)
      log("Address Type: ", chalk.white(terminalLink("SegWit (Bech32/P2WPKH)", INFO.SEGWIT)));
    else if (address[0] == 1)
      log("Address Type: ", chalk.white("Legacy (P2PKH)"));
    else if (address[0] == 3)
      log("Address Type: ", chalk.white("P2SH / Nested Segwit"));

    log("ASM:", chalk.blue(bitcoin.script.toASM(script)));

    //log("check: ", bitcoin.address.fromBech32(address))
    // var payload = script.slice(0, -4)
    // var checksum = script.slice(-4)

    if (options.verbose) {
      log("Script:", chalk.blue(script.toString('hex')));
      log("Decompiled script:", decompiledScript);
      log("Reversed Script (for Electrum):", chalk.blue(rScriptHash));
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
        log("Hash: ", terminalLink(utxo.tx_hash, `https://blockchair.com/bitcoin/transaction/${utxo.tx_hash}`));
        log("Value:", chalk.blue(utxo.value / BTC_UNIT + " BTC "));
      });

      let history = await client.blockchain_scripthash_getHistory(rScriptHash);
      spinner.clear();

      log(`Transaction History (${history.length})`)

      history.forEach(h => {
        log("ID:", terminalLink(h.tx_hash, `https://blockchair.com/bitcoin/transaction/${h.tx_hash}`));
      })
      spinner.stop();
    }
  } catch (err) {
    log("Error: wrong format address");
  }
}

module.exports = address;
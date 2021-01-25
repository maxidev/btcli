const chalk = require('chalk');
const connect = require('../utils/connect');
const explorer = require('../utils/explorer');
const terminalLink = require('terminal-link');
const ora = require('ora');

async function transaction(transaction, options) {

  const spinner = ora();

  try {
    const client = await connect();

    spinner.spinner = 'squareCorners';
    spinner.start();

    let tx = await client.blockchain_transaction_get(transaction, true);
    let { txid, size, vin, vout, blockhash, confirmations, time } = tx;

    spinner.clear();
    log('ID: ', chalk.blue(terminalLink(txid, explorer.tx(txid))));
    log('Block Hash: ', chalk.green(terminalLink(blockhash, explorer.block(blockhash))));
    log('Confirmations: ', chalk.green(confirmations));
    log('Size: ', chalk.green(size + ' bytes'))
    const dateObject = new Date(time * 1000)
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    log('Timestamp: ', chalk.green(time + ` (${humanDateFormat} UTC)`));

    if (options.verbose) {
      log('Inputs:', vin);
      log('Outputs:', vout)
    }

    spinner.stop();
    await client.close();
  } catch (err) {
    spinner.clear();
    log(chalk.red('Error: tx malformed or not found (check Electrum server)'));
    spinner.stop();
  }
}

module.exports = transaction;
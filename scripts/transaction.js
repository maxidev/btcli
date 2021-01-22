const chalk = require('chalk');
const terminalLink = require('terminal-link');

async function transaction(client, options) {
  try {
    const transaction = options.transaction;
    let tx  = await client.blockchain_transaction_get(transaction, true);

    let { txid, size, vin, vout, blockhash, confirmations, time } = tx;
    
    if(options.verbose){

    }else{
      log("ID: ", chalk.blue(terminalLink(txid, `https://blockchair.com/bitcoin/transaction/${txid}`)));
      log("Block Hash: ", chalk.green(terminalLink(blockhash, `https://blockchair.com/bitcoin/block/${blockhash}`)));
      log("Confirmations: ", chalk.green(confirmations));
      log("Size: ", chalk.green(size + " bytes"))
      const dateObject = new Date(time*1000)
      const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
      log("Timestamp: ", chalk.green(time + ` (${humanDateFormat} UTC)`));
    }
    
  } catch (err) {
    console.log(err);
  }
}

module.exports = transaction;
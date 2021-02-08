const { getBlockUrl, getTransactionUrl } = require('../utils/url');
const { isVerbose } = require('../utils/args');
const { outputConfiguration } = require('../utils/commander');
const { program } = require('commander');
const chalk = require('chalk');
const connect = require('../utils/connect');
const ora = require('ora');
const util = require('util');

async function transaction(transaction) {
  const { writeOut } = program.configureOutput();
  const spinner = ora();
  const verbose = isVerbose();
  let response = {};

  try {
    const client = await connect();

    spinner.spinner = 'squareCorners';
    spinner.start();

    const tx = await client.blockchain_transaction_get(transaction, true);
    const { txid, size, vin, vout, blockhash, confirmations, time } = tx;
    const dateObject = new Date(time * 1000);
    const humanDateFormat = dateObject.toLocaleString();

    response = {
      id: {
        formatter: chalk.blue,
        raw: txid,
        value: getTransactionUrl(txid)
      },
      blockHash: {
        formatter: chalk.green,
        raw: blockhash,
        value: getBlockUrl(blockhash)
      },
      confirmations: {
        formatter: chalk.green,
        value: confirmations
      },
      size: {
        formatter: chalk.green,
        raw: size,
        value: `${size} bytes`
      },
      timestamp: {
        formatter: chalk.green,
        raw: time,
        value: `${time} (${humanDateFormat} UTC)`
      }
    };

    if (verbose) {
      util.inspect.defaultOptions.depth = null;
      response = {
        ...response,
        inputs: {
          formatter: util.inspect,
          value: vin
        },
        outputs: {
          formatter: util.inspect,
          value: vout
        }
      };
    }

    spinner.clear();
    spinner.stop();

    await client.close();

    writeOut(response, transaction);
  } catch (err) {
    spinner.clear();

    console.log(chalk.red(`Error: ${err}`));

    spinner.stop();
  }
}

program
  .command('tx <transaction>')
  .action(transaction)
  .configureOutput(outputConfiguration)
  .parse(process.argv);

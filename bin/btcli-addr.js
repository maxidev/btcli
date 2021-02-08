//const { formatDecompiledScript } = require('../utils/formatter');
const { getAddressUrl, getTransactionUrl } = require('../utils/url');
const { isVerbose, isTestnet } = require('../utils/args');
const { outputConfiguration } = require('../utils/commander');
const { program } = require('commander');
const addressUtils = require('../utils/address');
const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');
const chalk = require('chalk');
const connect = require('../utils/connect');
const ora = require('ora');

async function address(address) {

  const { writeOut } = program.configureOutput();
  const spinner = ora();
  const verbose = isVerbose();
  let response = {};
  let network = bitcoin.networks.bitcoin;
  
  try {
    if(isTestnet())
      network = bitcoin.networks.testnet;
    if (!addressUtils.isValid(address)) {
      throw new Error('Wrong address / Invalid format');
    }

    const client = await connect();

    spinner.spinner = 'squareCorners';

    const script = bitcoin.address.toOutputScript(address, network);
    const hash = bitcoin.crypto.sha256(script);
    const reversedHash = new Buffer.from(hash.reverse());
    const rScriptHash = reversedHash.toString('hex');
    const decompiledScript = bitcoin.script.decompile(script);
    const addressType = addressUtils.getType(address);
    const asm = bitcoin.script.toASM(script);

    response = {
      address: {
        formatter: chalk.magentaBright,
        raw: address,
        value: getAddressUrl(address)
      },
      addressType: {
        formatter: chalk.white,
        value: addressType
      },
      ASM: {
        formatter: chalk.blue,
        value: asm
      }
    };
    
    if (verbose) {
      response = {
        ...response,
        script: {
          formatter: chalk.blue,
          value: script.toString('hex')
        },
        // decompiledScript: {
        //   ...formatDecompiledScript(decompiledScript)
        // },
        reversedScript: {
          formatter: chalk.blue,
          title: 'Reversed Script (for Electrum)',
          value: rScriptHash
        }
      };
    }

    spinner.start();

    const BTC_UNIT = 100000000;
    let balance = await client.blockchain_scripthash_getBalance(rScriptHash)
    let btcBalance = balance.confirmed / BTC_UNIT;
    let btcPrice = 0;

    let finalBalance;

    /*
      Query for USD balance only if balance var shows value greather than 0
    */
    if (balance.confirmed > 0) {
      btcPrice = (await axios.get('https://blockchain.info/q/24hrprice')).data;
      finalBalance = `${btcBalance} BTC (~ ${(btcBalance * btcPrice).toFixed(2)} USD) [1 BTC ~ ${btcPrice} USD]`;
    }

    spinner.stop();
    spinner.clear();

    finalBalance = `${btcBalance} BTC (~ ${(btcBalance * btcPrice).toFixed(2)} USD)`;

    response = {
      ...response,
      Balance: {
        formatter: chalk.green,
        value: finalBalance
      }
    };

    if (verbose) {
      spinner.start();

      const history = await client.blockchain_scripthash_getHistory(rScriptHash);
      const UTXO = await client.blockchain_scripthash_listunspent(rScriptHash);
      
      const UTXOS = UTXO.reduce((accumulator, { tx_hash, value, tx_pos }) => {
        const _value = `${value} Sats`;

        return {
          ...accumulator,
          [tx_hash]: {
            shouldDestructure: true,
            title: `Tx Id: ${getTransactionUrl(tx_hash)}`,
            value: {
              pos: {
                formatter: chalk.white,
                title: 'vout',
                value: tx_pos
              },
              value: {
                formatter: chalk.blue,
                title: 'Value',
                value: _value
              }
            }
          }
        };
      }, {});

      const txs = history.reduce((accumulator, { tx_hash }) => {
        return {
          ...accumulator,
          [tx_hash]: {
            raw: tx_hash,
            title: 'ID',
            value: getTransactionUrl(tx_hash)
          }
        };
      }, {});

      spinner.clear();
      
      response = {
        ...response,
        UTXO: {
          shouldDestructure: true,
          title: `UTXOs (${UTXO.length})`,
          value: UTXOS
        },
        transactionHistory: {
          shouldDestructure: true,
          title: `Transaction History (${history.length})`,
          value: txs
        }
      };
    }

    spinner.stop();

    await client.close();

    writeOut(response, address);
  } catch (err) {
    console.log(chalk.red(err));
  }
}

program
  .command('addr <address>')
  .action(address)
  .configureOutput(outputConfiguration)
  .parse(process.argv);

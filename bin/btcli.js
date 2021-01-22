#!/usr/bin/env node

const { program } = require('commander');
const address = require('../scripts/address');
const ElectrumClient = require('@codewarriorr/electrum-client-js');
const transaction = require('../scripts/transaction');

global.log = console.log;

// COMMON OPCODE list in hex
const OP_0 = '00';
const OP_1 = '51';
const OP_2 = '52';
const OP_3 = '53';
const OP_4 = '54';
const OP_5 = '55';
const OP_6 = '56';
const OP_7 = '57';
const OP_8 = '58';
const OP_9 = '59';
const OP_10 = '5a';
const OP_11 = '5b';
const OP_12 = '5c';
const OP_13 = '5d';
const OP_14 = '5e';
const OP_15 = '5f';
const OP_16 = '60';
const OP_RETURN = '6a';
const OP_DUP = '76';
const OP_EQUAL = '87';
const OP_EQUALVERIFY = '88';
const OP_CHECKSIG = 'ac';
const OP_CHECKMULTISIG = 'ae';
const OP_HASH160 = 'a9';

async function connect() {
  const client = new ElectrumClient(
    'electrum1.baremetalpittsburgh.net',
    50002,
    'ssl'
  );

  await client.connect();

  return client;
}

async function main() {
  program
    .description('BTCli - A simple command line Bitcoin explorer')
    .version('0.0.1', '-v, --vers', 'output the current version');

  try {
    const client = await connect();

    console.log('-------------------------');

    program
      .command('addr <address>')
      .description('Bitcoin Address to check legacy/bech32 supported')
      .option('-V, --verbose', 'verbose output')
      .action(async (_address, options) => {
        await address(client, _address, options);
      });

    program
      .command('tx <transaction>')
      .description('Bitcoin transaction')
      .action(async (tx, options) => {
        await transaction(client, tx, options);
      });

    await program.parseAsync(process.argv);

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

main()
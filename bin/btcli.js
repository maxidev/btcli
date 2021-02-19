#!/usr/bin/env node

const { Option, program } = require('commander');
const { version } = require('../package.json');

// COMMON OPCODE list in hex | HEXA comparison DON'T DELETE
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

program
  .description('BTCli - A simple command line Bitcoin explorer')
  .command('addr <address>', 'Bitcoin Address to check legacy/bech32 supported')
  .command('block <height>', 'Bitcoin block information')
  .command('tx <transaction>', 'Bitcoin transaction')
  .version(version, '-v, --version', 'Output the current version')
  .addOption(
    new Option('-e, --explorer <explorer>, Web Explorer to link')
      .choices(['blockchair', 'blockchain-info', 'blockstream', 'btc'])
  )
  .option('--tojson [filename]', 'JSON Output')
  .option('-V, --verbose', 'Verbose output')
  .option('-t, --testnet', 'Set Bitcoin testnet network')
  .on('option:explorer', (explorer) => {
    process.env.explorer = explorer;
  })
  .on('option:tojson', (filename) => {
    process.env.filename = filename;
    process.env.tojson = true;
  })
  .on('option:verbose', () => {
    process.env.verbose = true;
  })
  .on('option:testnet', () => {
    process.env.testnet = true;
  })
  .parse(process.argv);

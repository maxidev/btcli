#!/usr/bin/env node

const { program } = require('commander');
const address = require('../scripts/address');
const transaction = require('../scripts/transaction');

global.log = console.log;

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

async function main() {
  program
    .description('BTCli - A simple command line Bitcoin explorer')
    .version('0.0.1', '-v, --vers', 'output the current version');

  try {
    program
      .command('addr <address>')
      .description('Bitcoin Address to check legacy/SegWit Bech32/ nested SegWit supported')
      .option('-e, --explorer <explorer>, Web Explorer to link: blockchair, blockchain-info, blockstream')
      .option('-V, --verbose', 'verbose output')
      .action(async (addr, options) => {
        await address(addr, options);
      });

    program
      .command('tx <transaction>')
      .description('Bitcoin transaction')
      .option('-V, --verbose', 'verbose output')
      .option('-e, --explorer <explorer>, Web Explorer to link: blockchair, blockchain-info, blockstream')
      .action(async (tx, options) => {
        await transaction(tx, options);
      });

    program
      .command('block <block>')
      .description('Bitcoin block information')
      .option('-e, --explorer <explorer>, Web Explorer to link: blockchair, blockchain-info, blockstream')
      .action(async (block, options) => {
        await transaction(block, options);
      });

    await program.parseAsync(process.argv);
  } catch (err) {
    console.error(err);
  }
}

main()
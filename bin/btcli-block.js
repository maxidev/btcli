const { program } = require('commander');
const { getBlockUrl } = require('../utils/url');
const connect = require('../utils/connect');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora();

async function block(height) {
  try {
    const client = await connect();

    spinner.spinner = 'squareCorners';
    spinner.start();
    console.log(chalk.red("Disclaimer: Block functionality is under heavy development\n"));
    let block = await client.blockchain_block_header(height)
    spinner.clear();
    spinner.stop();
    console.log(chalk.white(getBlockUrl(block)));
    process.exit(1);

  } catch (error) {
    console.log(error);
  }
}



program
  .command('block <height>')
  .action(block)
  .parse(process.argv);
const { program } = require('commander');

async function block(id) {
  console.log(`Give me the block ${id}`);
}

program
  .command('block <id>')
  .action(block)
  .parse(process.argv);
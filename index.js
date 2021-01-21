const ElectrumClient = require('@codewarriorr/electrum-client-js')
const bitcoin = require('bitcoinjs-lib');
const { program } = require('commander');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const axios = require('axios');

const log = console.log;


// COMMON OPCODE list in hex
const OP_0           = '00';
const OP_1           = '51';
const OP_2           = '52';
const OP_3           = '53';
const OP_4           = '54';
const OP_5           = '55';
const OP_6           = '56';
const OP_7           = '57';
const OP_8           = '58';
const OP_9           = '59';
const OP_10          = '5a';
const OP_11          = '5b';
const OP_12          = '5c';
const OP_13          = '5d';
const OP_14          = '5e';
const OP_15          = '5f';
const OP_16          = '60';
const OP_RETURN      = '6a';
const OP_DUP         = '76';
const OP_EQUAL       = '87';
const OP_EQUALVERIFY = '88';
const OP_CHECKSIG    = 'ac';
const OP_CHECKMULTISIG = 'ae';
const OP_HASH160     = 'a9';


program
  .description('BTCli - A simple command line Bitcoin explorer')
  .version('0.0.1', '-v, --vers', 'output the current version')
  .option('-addr, --address <addr>', 'Bitcoin Address to check legacy/bech32 supported')
  //.option('-i, --history ', 'Get',)
  .option('-V, --verbose', 'verbose output')
  .option('-tx, --transaction <tx>', 'tx');

program.parse();

if(Object.keys(program.opts()).length == 0 )
  program.help();


async function main () {
  const options = program.opts();

    try {

    const client = new ElectrumClient(
        'electrum1.baremetalpittsburgh.net',
        50002,
        'ssl'
      )

    await client.connect();

    console.log("-------------------------");

    let addr = options.address;


    let script = bitcoin.address.toOutputScript(addr)
    
    let hash = bitcoin.crypto.sha256(script)
    let reversedHash = new Buffer.from(hash.reverse())

    let rScriptHash = reversedHash.toString('hex');

    let decompiledScript = bitcoin.script.decompile(script);
    
    log("Address: ",  chalk.magentaBright(terminalLink(addr, `https://blockchair.com/bitcoin/address/${addr}`)));
    
    if(decompiledScript[0] == 0)
      log("Address Type: ", chalk.white("SegWit (Bech32/P2WPKH)"));
    else if(addr[0] == 1)
      log("Address Type: ", chalk.white("Legacy (P2PKH)"));
    else if(addr[0] == 3)
      log("Address Type: ", chalk.white("P2SH / Nested Segwit"));

    log("ScriptHash: ", chalk.blue(bitcoin.script.toASM(script)));

    if(options.verbose){
      
      let arr = [...script];
      //console.log("Script: ", arr[2].toString(16));
      //console.log("Script: ", script.toString('hex'));
      console.log("Electrum reversed script_hash: ", rScriptHash);
    }

    let balance = await client.blockchain_scripthash_getBalance(rScriptHash)
    
    const BTC_UNIT = 100000000;
    
    let btcBalance = balance.confirmed/BTC_UNIT;
    let btcPrice = (await axios.get('https://blockchain.info/q/24hrprice')).data;
    
    log('Balance:', chalk.green(btcBalance + ` BTC (~ ${(btcBalance*btcPrice).toFixed(2)} USD)`));
    
    if(options.verbose){

      let UTXOs = await client.blockchain_scripthash_listunspent(rScriptHash);
      log(`UTXOs (${UTXOs.length})`);
      UTXOs.forEach(utxo => {
        log("Hash: ", terminalLink(utxo.tx_hash, `https://blockchair.com/bitcoin/transaction/${utxo.tx_hash}`));
        log("Value:", chalk.blue(utxo.value / BTC_UNIT + " BTC "));
      });

      log("Transaction History")
      let history = await client.blockchain_scripthash_getHistory(rScriptHash);
      history.forEach(h => {
        log("TX ID:", terminalLink(h.tx_hash, `https://blockchair.com/bitcoin/transaction/${h.tx_hash}`));
      })
    }

    await client.close()
    
  } catch (err) {
      console.error(err);
  }
}

main()
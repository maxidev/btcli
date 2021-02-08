const bitcoin = require('bitcoinjs-lib');
const { isTestnet } = require('./args');

const LEGACY_ADDR = 'Legacy (P2PKH)';
const BECH32_ADDR = 'SegWit (Bech32)';
const SCRIPT_HASH_ADDR = 'Nested Segwit / Legacy P2SH';
const TESTNET_SCRIPT_HASH = "MultiSig TESTNET";

/* 
  Detect if address is valid checksum / format
*/
function isValid(_address) {
  try {

    if(isTestnet()){
      if(_address[0] == 'm' || _address[0] == 'n' || _address[0] == '2'){
        bitcoin.address.fromBase58Check(_address);
        return true;
      }else if(_address[0] == 't' && _address[1] == 'b' && _address[2] == 1){
        bitcoin.address.fromBech32(_address);
        return true;
      }else{
        return false;
      }
    }else{
      if (_address[0] == 1 || _address[0] == 3) {
        bitcoin.address.fromBase58Check(_address);
        return true;
      } else if (_address[0] == 'b' && _address[1] == 'c' && _address[2] == 1) {
        bitcoin.address.fromBech32(_address);
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
}

/* 
  Checks for address integrity and returns type
*/
function getType(_address) {
  try {
    if (!this.isValid(_address))
      throw new Error("Invalid format");

    if (_address[0] == 1) {
      bitcoin.address.fromBase58Check(_address);
      return LEGACY_ADDR;
    } else if (_address[0] == 'b' && _address[1] == 'c' && _address[2] == 1) {
      bitcoin.address.fromBech32(_address);
      return BECH32_ADDR;
    } else if (_address[0] == 3) {
      bitcoin.address.fromBase58Check(_address);
      return SCRIPT_HASH_ADDR;
    }else if(_address[0] == 'm' || _address[0] == 'n'){
      bitcoin.address.fromBase58Check(_address);
      return LEGACY_ADDR + "[TESTNET]";
    }else if(_address[0] == 't' && _address[1] == 'b' && _address[2] == 1){
      bitcoin.address.fromBech32(_address);
      return BECH32_ADDR + "[TESTNET]";
    }else if(_address[0] == 2){
      bitcoin.address.fromBase58Check(_address);
      return TESTNET_SCRIPT_HASH;
    }else{
      return "Unknown Address Type";
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getType,
  isValid
};
const bitcoin = require('bitcoinjs-lib');
const chalk = require('chalk');

const LEGACY_ADDR = 'Legacy (P2PKH)';
const BECH32_ADDR = 'SegWit (Bech32)';
const SCRIPT_HASH_ADDR = 'Nested Segwit / Legacy P2SH';

/* 
  Detect if address is valid checksum / format
*/
function isValid(_address) {

  try {
    if(_address[0] == 1 || _address[0] == 3){
      bitcoin.address.fromBase58Check(_address);
      return true;
    }else if(_address[0] == 'b' && _address[1] == 'c' && _address[2] && 1){
      log(bitcoin.address.fromBech32(_address));
      bitcoin.address.fromBech32(_address);
      return true;
    }else{
      return false;
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
    
    if(!this.isValid(_address))
      throw new Error("Invalid format");
      
    if(_address[0] == 1){
      bitcoin.address.fromBase58Check(_address);
      return LEGACY_ADDR;
    }else if(_address[0] == 'b' && _address[1] == 'c' && _address[2] && 1){
      bitcoin.address.fromBech32(_address);
      return BECH32_ADDR;
    }else if (_address[0] == 3){
      bitcoin.address.fromBase58Check(_address);
      return SCRIPT_HASH_ADDR;
    }
    
  } catch (error) {
    log(error);
  }
  
}

module.exports = {
  isValid: isValid,
  getType: getType
};
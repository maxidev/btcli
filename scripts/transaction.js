async function transaction(client, options) {
  try {
    const transaction = options.transaction;

    console.log(`Gimme info about tx: ${transaction}`);  
  } catch (err) {
    console.log(err);
  }
}

module.exports = transaction;
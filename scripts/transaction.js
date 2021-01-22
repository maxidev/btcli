async function transaction(client, options) {
  try {
    const transaction = options.transaction;
    let tx  = await client.blockchain_transaction_get(transaction, true);
    console.log(tx);
  } catch (err) {
    console.log(err);
  }
}

module.exports = transaction;
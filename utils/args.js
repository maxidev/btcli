function isVerbose() {
  return process.env['verbose'];
}

function shouldWriteToJSON() {
  return process.env['tojson'];
}

module.exports = {
  isVerbose,
  shouldWriteToJSON
};
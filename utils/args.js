function getServer() {
  return process.env.explorer || 'blockchair';
}

function isVerbose() {
  return process.env['verbose'];
}

function shouldWriteToJSON() {
  return process.env['tojson'];
}

module.exports = {
  getServer,
  isVerbose,
  shouldWriteToJSON
};

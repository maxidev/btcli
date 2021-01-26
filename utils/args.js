function getFileName(fileName) {
  const customFileName = process.env.filename;
  
  return customFileName === 'null' ? fileName : customFileName;
}

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
  getFileName,
  getServer,
  isVerbose,
  shouldWriteToJSON
};

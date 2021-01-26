const { greenBright } = require('chalk');
const isArray = require('lodash/isArray');

function formatDecompiledScript(decompileScript) {
  if (!isArray(decompileScript)) return [];

  const [first, second, buffer, fourth, fifth] = decompileScript;
  const formattedBuffer = `<Buffer ${buffer.toString('hex').match(/../g).join(' ')}>`;

  return {
    raw:  [first, second, formattedBuffer, fourth, fifth],
    value: (
      `
      [
        ${greenBright(first)},
        ${greenBright(second)},
        ${formattedBuffer}  
        ${greenBright(fourth)},
        ${greenBright(fifth)}
      ]  
      `
    )
  };
}

module.exports = {
  formatDecompiledScript
};

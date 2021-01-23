const { shouldWriteToJSON } = require('./args');
const chalk = require('chalk');
const fs = require('fs');
const isUndefined = require('lodash/isUndefined');
const startCase = require('lodash/startCase');

const parseLogs = (output) => {
  Object.keys(output).forEach((key) => {
    const { formatter, shouldDestructure, title, value } = output[key];
    const formattedValue = (formatter) ? formatter(value) : value;
    const _title = isUndefined(title) ? startCase(key) : title;

    if (shouldDestructure) {
      console.log(chalk.bold(_title));

      parseLogs(value);
    } else {
      console.log(`${chalk.bold(_title)}: ${formattedValue}`);
    }
  });
}

const parseJSON = (output) => {
  let response = {};

  Object.keys(output).map((key) => {
    const { raw, shouldDestructure, value } = output[key];
    const _value = (raw || value);

    if (shouldDestructure) {
      response[key] = parseJSON(_value);
    } else {
      response[key] = _value;
    }
  });

  return response;
}

const outputConfiguration = {
  writeOut: (output) => {
    if (shouldWriteToJSON()) {
      const response = parseJSON(output);

      fs.writeFile('out.json', JSON.stringify(response, null, 2), (err) => {
        const file = chalk.bold('out.json');

        if (err) {
          console.log(chalk.red(`Error creating ${file}.`));
        }

        console.log(chalk.green(`${file} created successfully.`));
      });
    } else {
      parseLogs(output);
    }
  }
};

module.exports = {
  outputConfiguration
};
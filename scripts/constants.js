const { createInterface } = require('readline');
const fs = require('fs');

const ask = (question) => new Promise((resolve) => {
  const interface = createInterface(process.stdin, process.stdout);

  interface.question(question, (answer) => {
    interface.close();

    resolve(answer);
  });
});

const exists = (path) => new Promise((resolve) => fs.access(path, fs.constants.F_OK, err => resolve(!err)));

function log(msg, type = 2) {
    if (!msg) return;

    let symbol = '';
    switch(type) {
        case 0:
            symbol = '❌';
            break;
        case 1:
            symbol = '✔️';
            break;
        case 2:
            symbol = '➕';
            break;
        default:
            symbol = 'ℹ️';
    }

    return console.log(`[${symbol}]`, msg);
};

module.exports = {
  ask,
  exists,
  log,
};
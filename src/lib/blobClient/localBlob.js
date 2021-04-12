const fs = require('fs');
const path = require('path');

const bucket = path.join(__dirname, './twitter-hunter');

module.exports = {
  getObject: (filename) => fs.readFileSync(`${bucket}/${filename}`),
  putObject: (filename, data) => fs.writeFileSync(`${bucket}/${filename}`, data),
};

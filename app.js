const overwriteFiles = require('./src/parse.js').overwriteFiles,
  overwriteFile = require('./src/parse.js').overwriteFile;

let folder,
  file,
  type,
  propeties = {};

// Getting arguments from CLI
process.argv.forEach(function (val, index, array) {
  switch (index) {
    case 0:
    case 1:
      break;
    case 2:
      folder = val;
      break;
    case 3:
      file = val;
      break;
    case 4:
      type = val;
      break;
    default :
      let values = val.split('=');
      if (values[1][0] === '"' || values[1][0] === '\'') {
        values[1] = values[1].substr(1, values[1].length - 1);
      }
      propeties[values[0]] = values[1];
      break;
  }
});

console.log('agruments >>> ', folder, file, type, propeties);
console.log('path >>> ', __dirname + '\\' + folder + '\\' + file);

// Getting file from folder and parsing
switch (file) {
  case '-all':
    overwriteFiles(__dirname, folder, type, propeties);
    break;
  default:
    overwriteFile(__dirname, folder, file, type, propeties);
    break;
}



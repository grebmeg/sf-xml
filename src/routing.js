const overwriteFiles = require('./parse.js').overwriteFiles,
  overwriteFile = require('./parse.js').overwriteFile,
  clearFiles = require('./parse.js').clearFiles,
  clearFile = require('./parse.js').clearFile;

// Getting file from folder and parsing
module.exports.routing = function (pathApp, file, folder, type, properties) {
  switch (file) {
    case '-all':
      overwriteFiles(pathApp, folder, type, properties);
      break;
    case '-clear':
      clearFiles(pathApp, folder);
      break;
    default:
      switch (type) {
        case '-parse':

          break;
        case '-clear':
          clearFile(pathApp, folder, file);
          break;
        default:
          overwriteFile(pathApp, folder, file, type, properties);
          break;
      }
  }
};
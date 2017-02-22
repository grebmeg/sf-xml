const { overwriteFiles, overwriteFile, clearFiles, clearFile, parseFile }  = require('./parse.js');

// Getting file from folder and parsing
module.exports.routing = (pathApp, file, folder, type, properties) => {
  switch (file) {
    case '-all':
      overwriteFiles(pathApp, folder, type, properties);
      break;
    case '-clear':
      clearFiles(pathApp, folder);
      break;
    default:
      switch (type) {
        case '-file':
          parseFile( pathApp, file );
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
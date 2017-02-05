const fs = require('fs'),
  parseXML = require('xml2js'),
  changeXMLObject = require('./change.js').changeXMLObject;

let parser = new parseXML.Parser();

module.exports.overwriteFiles = function (path, folder, type, propeties) {
  fs.readdir(folder, (err, files) => {
    let quantityFiles = 0;
    files.forEach(file => {
      overwriteFile(path, folder, file, type, propeties);
      quantityFiles++;
    });
    console.log( 'It\'s updated files: ', quantityFiles );
  })
};

function overwriteFile(path, folder, file, type, propeties) {
  fs.readFile(path + '\\' + folder + '\\' + file, function (err, data, JSONObject) {
    parser.parseString(data, function (err, result, JSONObject) {
      obj = changeXMLObject(result, type, propeties);

      //console.log(JSON.stringify(obj, null, ' '));
      // Below it's created new object and is saved him
      let builder = new parseXML.Builder();
      let XMLObject = builder.buildObject(obj);
      console.log(XMLObject);
      fs.writeFile(path + '\\' + folder + '\\' + file, XMLObject, (err) => {
        if (err) throw err;
        //console.log('It\'s saved!');
      });
    });
  });
  console.log( 'The file is updated.' );
};

module.exports.overwriteFile = overwriteFile;
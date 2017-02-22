const fs = require('fs'),
  parseXML = require('xml2js'),
  { changeXMLObject, clearXMLObject } = require('./change.js');

let parser = new parseXML.Parser();

module.exports.overwriteFiles = (path, folder, type, properties) => {
  fs.readdir(folder, (err, files) => {
    let quantityFiles = 0;
    files.forEach(file => {
      overwriteFile(path, folder, file, type, properties);
      quantityFiles++;
    });
    console.log( 'Quantity of updated files are: ', quantityFiles );
  })
};

module.exports.clearFiles = (path, folder) => {
  fs.readdir(folder, (err, files) => {
    let quantityFiles = 0;
    files.forEach(file => {
      clearFile(path, folder, file);
      quantityFiles++;
    });
    console.log( 'Quantity of cleaned files are: ', quantityFiles );
  })
};

module.exports.parseFile = (pathApp, file) => {
  fs.readFile( pathApp + '\\' + file, 'utf8', (err, data) => {
    let dataset = data.split('\r\n');
    console.log( dataset );
    dataset.forEach( command => {

      }
    );
  })
};

function clearFile(path, folder, file) {
  fs.readFile(path + '\\' + folder + '\\' + file, function (err, data, JSONObject) {
    parser.parseString(data, function (err, result, JSONObject) {
      obj = clearXMLObject(result);

      //console.log(JSON.stringify(obj, null, ' '));
      // Below it's created new object and is saved him
      let builder = new parseXML.Builder();
      let XMLObject = builder.buildObject(obj);
      //console.log(XMLObject);
      fs.writeFile(path + '\\' + folder + '\\' + file, XMLObject, (err) => {
        if (err) throw err;
        //console.log('It\'s saved!');
      });
    });
  });
  //console.log( 'The file is updated.' );
}

function overwriteFile(path, folder, file, type, properties) {
  fs.readFile(path + '\\' + folder + '\\' + file, function (err, data, JSONObject) {
    parser.parseString(data, function (err, result, JSONObject) {
      obj = changeXMLObject(result, type, properties);

      //console.log(JSON.stringify(obj, null, ' '));
      // Below it's created new object and is saved him
      let builder = new parseXML.Builder();
      let XMLObject = builder.buildObject(obj);
      //console.log(XMLObject);
      fs.writeFile(path + '\\' + folder + '\\' + file, XMLObject, (err) => {
        if (err) throw err;
        //console.log('It\'s saved!');
      });
    });
  });
  //console.log( 'The file is updated.' );
}

module.exports.overwriteFile = overwriteFile;
module.exports.clearFile = clearFile;
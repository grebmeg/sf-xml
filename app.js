const parseXML = require('xml2js'),
  fs = require('fs');

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
      if (values[1][0] === '\'') {
        values[1] = values[1].substr(1, values[1].length - 2);
      }
      propeties[values[0]] = values[1];
      break;
  }
});

console.log('agruments >>> ', folder, file, type, propeties);
console.log('path >>> ', __dirname + '\\' + folder + '\\' + file);
// Getting file from folder and parsing
let parser = new parseXML.Parser();

switch (file) {
  case '-all':
    overwriteFiles(folder);
    break;
  default:
    overwriteFile(__dirname, folder, file);
    break;
}

function overwriteFiles(folder) {
  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      overwriteFile(__dirname, folder, file)
    });
  })
}


function overwriteFile(path, folder, file) {
  fs.readFile(path + '\\' + folder + '\\' + file, function (err, data, JSONObject) {
    parser.parseString(data, function (err, result, JSONObject) {
      obj = changeXMLObject(result, type, propeties);
      //console.log(JSON.stringify(obj, null, ' '));
      let builder = new parseXML.Builder();
      let XMLObject = builder.buildObject(obj);
      //console.log(XMLObject);
      fs.writeFile(__dirname + '\\' + folder + '\\' + file, XMLObject, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
      });
    });
  });
}


function changeXMLObject(object, type, propeties) {
  switch (type) {
    case '-fp':
      return addFieldPermissions(object, propeties);
      break;
  }
}

function addFieldPermissions(object, propeties) {
  if (object.Profile.hasOwnProperty('fieldPermissions')) {
    console.log('true fieldPermissions');
    object.Profile['fieldPermissions'].push({
      'field': propeties['-n'],
      'editable': propeties['-w'],
      'readable': propeties['-r']
    })
  }

  return object;
}


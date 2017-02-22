const handleArg = require('./src/handleArg.js').handleArg,
  routing = require('./src/routing.js').routing;

let params = {
  folder: '',
  file: '',
  type: '',
  properties: {}
};

// Getting arguments from CLI
process.argv.forEach(function (val, index) {
 handleArg( val, index, params );
});

let { folder, file, type, properties } = params;

console.log('agruments >>> ', folder, file, type, properties);
console.log('path >>> ', __dirname + '\\' + folder + '\\' + file);

// Routing for handling profiles
routing(__dirname, file, folder, type, properties);



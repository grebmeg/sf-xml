const handleArg = require('./src/handleArg.js').handleArg,
  routing = require('./src/routing.js').routing;

let { file, folder, type, properties } = handleArg( process.argv );

console.log('agruments >>> ', folder, file, type, properties);
console.log('path >>> ', __dirname + '\\' + folder + '\\' + file);

// Routing for handling profiles
routing(__dirname, file, folder, type, properties);
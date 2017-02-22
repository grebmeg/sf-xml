const handleArg = require('./handleArg.js').handleArg,
  routing = require('./routing.js').routing;

module.exports.handleInput = ( argv , pathApp ) => {
  let { file, folder, type, properties } = handleArg( argv );

  console.log('agruments >>> ', folder, file, type, properties);
  console.log('path >>> ', pathApp + '\\' + folder + '\\' + file);

  // Routing for handling profiles
  routing(pathApp, file, folder, type, properties);

};



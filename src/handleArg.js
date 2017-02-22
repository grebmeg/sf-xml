module.exports.handleArg = function (val, index, params) {
  switch (index) {
    case 0:
    case 1:
      break;
    case 2:
      params.folder = val;
      break;
    case 3:
      params.file = val;
      break;
    case 4:
      params.type = val;
      break;
    default :
      let values = val.split('=');
      if (values[1][0] === '"' || values[1][0] === '\'') {
        values[1] = values[1].substr(1, values[1].length - 2);
      }
      params.properties[values[0]] = values[1];
      break;
  }
};
module.exports.changeXMLObject = function (object, type, properties) {
  if ( properties.hasOwnProperty('-delete') ) {
    switch (type) {
      case '-fp':
      case '-fieldPermissions':
        return deleteXML( object, properties, 'fieldPermissions', 'field' );
        break;
      case '-la':
      case '-layoutAssignments':
        return deleteXML(object, properties, 'layoutAssignments', 'layout');
        break;
      case '-rtv':
      case '-recordTypeVisibilities':
        return deleteXML(object, properties, 'recordTypeVisibilities', 'recordType');
        break;
      case '-op':
      case '-objectPermissions':
        return deleteXML(object, properties, 'objectPermissions', 'object');
        break;
    }
  } else {
    switch (type) {
      case '-fp':
      case '-fieldPermissions':
        return addFieldPermissions(object, properties);
        break;
      case '-la':
      case '-layoutAssignments':
        return addLayoutAssignments(object, properties);
        break;
      case '-rtv':
      case '-recordTypeVisibilities':
        return addRecordTypeVisibilities(object, properties);
        break;
      case '-op':
      case '-objectPermissions':
        return addObjectPermissions(object, properties);
        break;
    }
  }
};

module.exports.clearXMLObject = function (object) {
  return clearXML( object );
};

function clearXML( object ) {
  let perm = ['fieldPermissions', 'layoutAssignments', 'recordTypeVisibilities', 'classAccesses', 'userLicense', 'pageAccesses', 'userPermissions', 'objectPermissions'];
  perm.forEach( ( el, index, array ) => {
    if ( object.Profile.hasOwnProperty( el ) ) {
      delete object.Profile[el];
    }
  });

  return object;
}

function deleteXML( object, properties, permission, definitionName ) {
  if ( object.Profile.hasOwnProperty( permission ) ) {
    let elForDel = [];
    object.Profile[ permission ].forEach( ( el, index, array ) => {
        if ( el[ definitionName ][0] === properties['-n'] ) {
          elForDel.push( index );
        }
      }
    );
    elForDel.reverse();
    for( let i = 0; i < elForDel.length; i++ ) {
      object.Profile[ permission ].splice( elForDel[i], 1 );
    }

  }

  return object;
}

function addObjectPermissions(object, properties) {
  if (object.Profile.hasOwnProperty('objectPermissions')) {

  } else {
    object.Profile['objectPermissions'] = [];
  }
  object.Profile['objectPermissions'].push({
    'allowCreate': properties['-c'] || properties['-allowCreate'],
    'allowDelete': properties['-d'] || properties['-allowDelete'],
    'allowEdit': properties['-e'] || properties['-allowEdit'],
    'allowRead': properties['-r'] || properties['-allowRead'],
    'modifyAllRecords': properties['-mar'] || properties['-modifyAllRecords'],
    'object': properties['-n'] || properties['-object'],
    'viewAllRecords': properties['-var'] || properties['-viewAllRecords']
  });

  return object;
}

function addRecordTypeVisibilities(object, properties) {
  if (object.Profile.hasOwnProperty('recordTypeVisibilities')) {

  } else {
    object.Profile['recordTypeVisibilities'] = [];
  }
  object.Profile['recordTypeVisibilities'].push({
    'recordType': properties['-n'] || properties['-recordType'],
    'default': properties['-d'] || properties['-default'],
    'visible': properties['-v'] || properties['-visible']
  });

  return object;
}

function addLayoutAssignments(object, properties) {
  if (object.Profile.hasOwnProperty('layoutAssignments')) {

  } else {
    object.Profile['layoutAssignments'] = [];
  }
  object.Profile['layoutAssignments'].push({
    'layout': properties['-n'] || properties['-layout']
  });

  return object;
}

function addFieldPermissions(object, properties) {
  if (object.Profile.hasOwnProperty('fieldPermissions')) {

  } else {
    object.Profile['fieldPermissions'] = [];
  }
  object.Profile['fieldPermissions'].push({
    'field': properties['-n'] || properties['-field'],
    'editable': properties['-w'] || properties['-editable'],
    'readable': properties['-r'] || properties['-readable']
  });

  return object;
}
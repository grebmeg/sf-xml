module.exports.changeXMLObject = function (object, type, properties) {
  if ( properties.hasOwnProperty('-delete') ) {
    switch (type) {
      case '-fp':
        return deleteXML( object, properties, 'fieldPermissions', 'field' );
        break;
      case '-la':
        return deleteXML(object, properties, 'layoutAssignments', 'layout');
        break;
      case '-rtv':
        return deleteXML(object, properties, 'recordTypeVisibilities', 'recordType');
        break;
      case '-op':
        return deleteXML(object, properties, 'objectPermissions', 'object');
        break;
    }
  } else {
    switch (type) {
      case '-fp':
        return addFieldPermissions(object, properties);
        break;
      case '-la':
        return addLayoutAssignments(object, properties);
        break;
      case '-rtv':
        return addRecordTypeVisibilities(object, properties);
        break;
      case '-op':
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
    'allowCreate': properties['-c'],
    'allowDelete': properties['-d'],
    'allowEdit': properties['-e'],
    'allowRead': properties['-r'],
    'modifyAllRecords': properties['-mr'],
    'object': properties['-n'],
    'viewAllRecords': properties['-vr']
  });

  return object;
}

function addRecordTypeVisibilities(object, properties) {
  if (object.Profile.hasOwnProperty('recordTypeVisibilities')) {

  } else {
    object.Profile['recordTypeVisibilities'] = [];
  }
  object.Profile['recordTypeVisibilities'].push({
    'recordType': properties['-n'],
    'default': properties['-d'],
    'visible': properties['-v']
  });

  return object;
}

function addLayoutAssignments(object, properties) {
  if (object.Profile.hasOwnProperty('layoutAssignments')) {

  } else {
    object.Profile['layoutAssignments'] = [];
  }
  object.Profile['layoutAssignments'].push({
    'layout': properties['-n']
  });

  return object;
}

function addFieldPermissions(object, properties) {
  if (object.Profile.hasOwnProperty('fieldPermissions')) {

  } else {
    object.Profile['fieldPermissions'] = [];
  }
  object.Profile['fieldPermissions'].push({
    'field': properties['-n'],
    'editable': properties['-w'],
    'readable': properties['-r']
  });

  return object;
}
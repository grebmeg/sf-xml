module.exports.changeXMLObject = function (object, type, propeties) {
  if ( propeties.hasOwnProperty('-delete') ) {
    switch (type) {
      case '-fp':
        return deleteXML( object, propeties, 'fieldPermissions', 'field' );
        break;
      case '-la':
        return deleteXML(object, propeties, 'layoutAssignments', 'layout');
        break;
      case '-rtv':
        return deleteXML(object, propeties, 'recordTypeVisibilities', 'recordType');
        break;
      case '-op':
        return deleteXML(object, propeties, 'objectPermissions', 'object');
        break;
    }
  } else {
    switch (type) {
      case '-fp':
        return addFieldPermissions(object, propeties);
        break;
      case '-la':
        return addLayoutAssignments(object, propeties);
        break;
      case '-rtv':
        return addRecordTypeVisibilities(object, propeties);
        break;
      case '-op':
        return addObjectPermissions(object, propeties);
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

function deleteXML( object, propeties, permission, definitionName ) {
  if ( object.Profile.hasOwnProperty( permission ) ) {
    let elForDel = [];
    object.Profile[ permission ].forEach( ( el, index, array ) => {
        if ( el[ definitionName ][0] === propeties['-n'] ) {
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

function addObjectPermissions(object, propeties) {
  if (object.Profile.hasOwnProperty('objectPermissions')) {

  } else {
    object.Profile['objectPermissions'] = [];
  }
  object.Profile['objectPermissions'].push({
    'allowCreate': propeties['-c'],
    'allowDelete': propeties['-d'],
    'allowEdit': propeties['-e'],
    'allowRead': propeties['-r'],
    'modifyAllRecords': propeties['-mr'],
    'object': propeties['-n'],
    'viewAllRecords': propeties['-vr']
  });

  return object;
}

function addRecordTypeVisibilities(object, propeties) {
  if (object.Profile.hasOwnProperty('recordTypeVisibilities')) {

  } else {
    object.Profile['recordTypeVisibilities'] = [];
  }
  object.Profile['recordTypeVisibilities'].push({
    'recordType': propeties['-n'],
    'default': propeties['-d'],
    'visible': propeties['-v']
  });

  return object;
}

function addLayoutAssignments(object, propeties) {
  if (object.Profile.hasOwnProperty('layoutAssignments')) {

  } else {
    object.Profile['layoutAssignments'] = [];
  }
  object.Profile['layoutAssignments'].push({
    'layout': propeties['-n']
  });

  return object;
}

function addFieldPermissions(object, propeties) {
  if (object.Profile.hasOwnProperty('fieldPermissions')) {

  } else {
    object.Profile['fieldPermissions'] = [];
  }
  object.Profile['fieldPermissions'].push({
    'field': propeties['-n'],
    'editable': propeties['-w'],
    'readable': propeties['-r']
  });

  return object;
}
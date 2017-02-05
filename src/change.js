module.exports.changeXMLObject = function (object, type, propeties) {
  if ( propeties.hasOwnProperty('-delete') ) {
    switch (type) {
      case '-fp':
        return deleteXML( object, propeties, 'fieldPermissions' );
        break;
      case '-la':
        return deleteXML(object, propeties, 'layoutAssignments');
        break;
      case '-rtv':
        return deleteXML(object, propeties, 'recordTypeVisibilities');
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
    }
  }
};

function deleteXML( object, propeties, permission ) {
  console.log( JSON.stringify( object.Profile, null, '  ' ));
  if ( object.Profile.hasOwnProperty( permission ) ) {
    let elForDel = [];
    object.Profile[ permission ].forEach( ( el, index, array ) => {
        if ( el[ 'recordType' ][0] === propeties['-n'] ) {
          elForDel.push( index );
        }
      }
    );
    elForDel.reverse();
    console.log( elForDel );
    for( let i = 0; i < elForDel.length; i++ ) {
      object.Profile[ permission ].splice( elForDel[i], 1 );
    }

  }

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
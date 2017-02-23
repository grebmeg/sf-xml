# sf-xml

It's script on Node.js to change XML files (profiles) for upload on Salesforce through ANT.  
In below link is given all metadata for profile definition:  
[Profile](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_profile.htm)

## TODO
- [x] adding and deleting 'fieldPermissions' for one or more profiles;
- [x] adding and deleting 'layoutAssignments' for one or more profiles;
- [x] adding and deleting 'recordTypeVisibilities' for one or more profiles;
- [x] performing command for clearing all profiles;
- [x] performing command for clearing only one profile;
- [ ] performing commands from prepared file (now you can copy list commands and past to CLI);
- [ ] beforehand check of existing permission;
- [ ] error handling;
- [ ] change names of parameters for command in the better way;
- [ ] generate one script file without dependencies from '/node_modules' folder;
- [ ] refactor adding or deleting permissions;
- [ ] take xml object from description, for example, from JSON;

## Install

1. Download git repo in folder where 'package.xml' was placed
2. Install Node.js
3. Install dependencies from package.json command:  
npm i
5. Use commands below

## Explanation

`node app folder=[relative path] files=[name of file|-all|-clear] type=[-fp|-la|-rtv|-op] values=[look below]`

, where:
* app - name of js file for running;
* folder - folder that stores files for changing;
* files:<br/>
    * "System Administrator.profile" - name of file, for example;
    * -all - parameter for updating all of the files in folder;
    * -clear - parameter for clearing all profiles;
* type - type of XML permission:
    * -fieldPermissions (or -fp)- mathes 'fieldPermissions', values:
        * -name=[string] (or -n) - name of field;
        * -editable=[true|false] (or -w) - permission for 'editable';
        * -readable=[true|false] (or -r) - permission for 'readable'';
    * -layoutAssignments (or -la) - mathes 'layoutAssignments', values:
        * -layout=[string] (or -n) - name of layout;
    * -recordTypeVisibilities (or -rtv) - mathes 'recordTypeVisibilities', values:
        * -recordType=[string] (or -n) - permission for 'recordType';
        * -default=[true|false] (or -d) - permission for 'default';
        * -visible=[true|false] (or -v) - permission for 'visible';
    * -objectPermissions (or -op) - mathes 'objectPermissions', values:
        * -object=[string] (or -n) - name of object;
        * -allowCreate=[true|false] (or -c) - permission for 'allowCreate';
        * -allowDelete=[true|false] (or -d) - permission for 'allowDelete';
        * -allowEdit=[true|false] (or -e) - permission for 'allowEdit';
        * -allowRead=[true|false] (or -r) - permission for 'allowRead';
        * -modifyAllRecords=[true|false] (or -mar) - permission for 'modifyAllRecords';
        * -viewAllRecords=[true|false] (or -var) - permission for 'viewAllRecords';
* values - parameters XML permission:
    * -delete=[true] - delete this permission, need to specify in the end of command.
    
For example:  
`node app test -all -fp -n='Account.TestTest__c' -w=true -r=true` - for adding new field permission;  
`node app test -all -fp -n='Account.TestTest__c' -w=true -r=true -delete=true` - for deleting field permission;

`node app test -clear` - clear all profiles from test folder;
`node app test -clear Admin.profile` - clear only 'Admin.profile' from test folder;
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
- [ ] performing commands from prepared file;
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
    * -fp - mathes 'fieldPermissions';
    * -la - mathes 'layoutAssignments';
    * -rtv - mathes 'recordTypeVisibilities';
    * -op - mathes 'objectPermissions';
* values - parameters XML permission:
    * -n=[name] - name of field or layout or object in depends on type;
    * -w=[true|false] - permission for 'editable';
    * -r=[true|false] - permission for 'readable'';
    * -c=[true|false] - permission for 'allowCreate';
    * -d=[true|false] - permission for 'allowDelete';
    * -e=[true|false] - permission for 'allowEdit';
    * -r=[true|false] - permission for 'allowRead';
    * -mr=[true|false] - permission for 'modifyAllRecords';
    * -vr=[true|false] - permission for 'viewAllRecords';
    * -delete=[true] - delete this.
    
For example:  
`node app test -all -fp -n='Account.TestTest__c' -w=true -r=true` - for adding new field permission;  
`node app test -all -fp -n='Account.TestTest__c' -w=true -r=true -delete=true` - for deleting field permission
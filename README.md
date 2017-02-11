# sf-xml

It's script on Node.js to change XML files (profiles) for upload on Salesforce through ANT.  
In below link is given all metadata for profile definition:  
[Profile](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_profile.htm)

## TODO
- [x] adding and deleting 'fieldPermissions' for one or more profiles;
- [x] adding and deleting 'layoutAssignments' for one or more profiles;
- [x] adding and deleting 'recordTypeVisibilities' for one or more profiles;
- [ ] performing commands from prepared file;
- [ ] beforehand check of existing permission;
- [ ] error handling;
- [ ] generate one script file without dependencies from '/node_modules' folder;
- [ ] refactor adding or deleting permissions;

## Install

1. Download git repo
2. Install Node.js
3. Install dependencies from package.json command:  
npm i
4. Put 'app.js' in folder where 'package.xml' was placed
5. Use commands below

## Explanation

`node app folder=[relative path] files=[name of file|-all] type=[-fp|-la|-rtv] values=[-n=[name]|-w=[true|false]|-r=[true|false]|-delete=[true]]`

, where:
* app - name of js file for running;
* folder - folder that stores files for changing;
* files:<br/>
    * "System Administrator.profile" - name of file, for example;
    * -all - parameter for updating all of the files in folder;
* type - type of XML permission:
    * -fp - mathes 'fieldPermissions';
    * -la - mathes 'layoutAssignments';
    * -rtv - mathes 'recordTypeVisibilities';
* values - parameters XML permission:
    * -n=[name] - name of field from SObject;
    * -w=[true|false] - permission for write;
    * -r=[true|false] - permission for read;
    * -delete=[true] - delete this.
    
For example:  
`node app test -all -fp -n='Account.TestTest__c' -w=true -r=true` - for adding new field permission;  
`node app test -all -fp -n='Account.TestTest__c' -w=true -r=true -delete=true` - for deleting field permission
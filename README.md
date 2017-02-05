# sf-xml

It's script on Node.js to change XML files for upload on Salesforce through ANT.

Install

1. Download git repo.
2. Install Node.js.
3. Install dependencies from package.json command:
    npm i
4. Use command below.

node app folder files type values

, where:
app - name of js file for running;
folder - folder that stores files for changing;
files:
    'System Administrator.profile' - name of file, for example;
    -all - parameter for updating all of the files in folder;
type - type of XML permission:
    -fp - mathes 'fieldPermissions';
values - parameters XML permission:
    -n - name of field from SObject;
    -w - permission for write;
    -r - permission for read;
    
For example:
    node app profiles -all -fp -n='Account.Test__c' -w=true -r=true


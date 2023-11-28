
function createNewDatawarehouse(){

}

function createNewDatawarehouse(){

}

function createNewDatawarehouse(){

}
createNewDatawarehouse()

const fs = require('fs');
const path = require('path');

function tagHOFields() {
  // Sensitivity mapping for the fields
const sensitivityMapping = {
    'employmentstatus': 'business:si-employmentstatus',
    'employer': 'business:si-employer',
    'payslip': 'business:lsi-payslip',
    'nationalinsurancenumber': 'personal:hsi-nationalinsurancenumber',
    'currentaddress': 'personal:si-currentaddress',
    'previousaddress': 'personal:si-previousaddress',
    'ageofproperty': 'business:lsi-ageofproperty',
    'energyrating': 'business:lsi-energyrating',
    'counciltaxband': 'business:lsi-counciltaxband',
    'student': 'personal:lsi-student',
    'healthstatus': 'personal:qsi-healthstatus',
    'existingloan': 'business:qsi-existingloan',
    'tenant': 'personal:qsi-tenant',
    'drivinglicence': 'personal:si-drivinglicence',
    'livingwithpartner': 'personal:qsi-livingwithpartner',
    'fostercarer': 'personal:qsi-fostercarer',
    'spousalmaintenanceincome': 'personal:qsi-spousalmaintenanceincome',
    'city': 'personal:si-city',
    'ethnicity': 'personal:qsi-ethnicity',
    'propertytype': 'business:lsi-propertytype',
    'norooms': 'business:lsi-norooms',
    'totalfloorarea': 'business:lsi-totalfloorarea',
    'carer': 'personal:qsi-carer',
    'socialtenant': 'personal:qsi-socialtenant',
    'pensioner': 'personal:qsi-pensioner',
    'nochildren': 'personal:lsi-nochildren',
    'totalamountinbank': 'business:hsi-totalamountinbank',
    'fullname': 'personal:si-fullname',
    'dateofbirth': 'personal:si-dateofbirth',
    'bankaccountno': 'business:hsi-bankaccountno',
    'creditcardno': 'business:hsi-creditcardno',
    'accountbalance': 'business:hsi-accountbalance',
    'disabilityallowance': 'personal:si-disabilityallowance',
    'citizenship': 'personal:si-citizenship',
    'email': 'personal:si-email',
    'gender': 'personal:lsi-gender',
    'yearlyenergycost': 'business:lsi-yearlyenergycost',
    'passportno': 'personal:hsi-passportno',
    'phoneno': 'personal:si-phoneno',
    'married': 'personal:lsi-married'
};

  // Function to tag homeowner data with sensitivity tags
  function tagHomeownerData(homeowner) {
    const taggedHomeowner = {};
    for (const key in homeowner) {
      if (sensitivityMapping[key]) {
        // If the field exists in the mapping, create a new key with the tag
        const newKey = sensitivityMapping[key];
        taggedHomeowner[newKey] = homeowner[key];
      } else {
        // If the field is not in the mapping, copy it as is
        taggedHomeowner[key] = homeowner[key];
      }
    }
    return taggedHomeowner;
  }

  // Define the path for homeowners.json relative to the current script
  const homeownersFilePath = path.join(__dirname, 'homeowners.json');

  // Read the homeowners.json file
  fs.readFile(homeownersFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    // Parse the JSON data
    const homeowners = JSON.parse(data);

    // Tag each homeowner's data
    const taggedHomeowners = homeowners.map(tagHomeownerData);

    // Define the path for the output file
    const outputFilePath = path.join(__dirname, 'taggedhomeowners.json');

    // Write the tagged data to a new JSON file
    fs.writeFile(outputFilePath, JSON.stringify(taggedHomeowners, null, 2), err => {
      if (err) throw err;
      console.log('The tagged homeowners data has been saved to taggedhomeowners.json');
    });
  });
}

// Call the function
tagHOFields();





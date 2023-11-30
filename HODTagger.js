const fs = require('fs');
const path = require('path');

function createNewDatawarehouse() {
  const inputFilePath = path.join(__dirname, 'taggedhomeowners.json');
  const outputFilePath1 = path.join(__dirname, 'homeowner-m.json');
  const outputFilePath2 = path.join(__dirname, 'homeowner-h.json');
  const outputFilePath3 = path.join(__dirname, 'homeowner-f-f.json');
  const outputFilePath4 = path.join(__dirname, 'homeowner-m-a-d.json');

  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("error to read file:", err);
      return;
    }

    const homeowners = JSON.parse(data);

    const medicalData = homeowners.map(homeowner => {
      const medicalFields = {};
      const fields = ['personal:qsi-healthstatus', 'personal:si-disabilityallowance'];
      fields.forEach(field => {
        if (homeowner.hasOwnProperty(field)) {
          medicalFields[field] = homeowner[field];
        }
      });
      return medicalFields;
    });

    const financialData = homeowners.map(homeowner => {
      const financialFields = {};
      const fields = ['personal:si-fullname', 'business:si-employmentstatus', 'business:si-employer', 'business:lsi-payslip',
        'business:hsi-totalamountinbank', 'business:hsi-bankaccountno', 'business:hsi-creditcardno',
        'business:hsi-accountbalance', 'business:lsi-yearlyenergycost', 'business:qsi-existingloan',
        'personal:si-drivinglicence', 'personal:qsi-spousalmaintenanceincome'];
      fields.forEach(field => {
        if (homeowner.hasOwnProperty(field)) {
          financialFields[field] = homeowner[field];
        }
      });
      return financialFields;
    });

    const demographicData = homeowners.map(homeowner => {
      const demographicFields = {};
      const fields = ['personal:si-currentaddress', 'personal:si-previousaddress', 'personal:si-fullname',
        'personal:si-dateofbirth', 'personal:si-city', 'personal:si-citizenship',
        'personal:si-email', 'personal:si-phoneno',
        'personal:hsi-nationalinsurancenumber', 'personal:hsi-passportno',
        'personal:qsi-carer', 'personal:qsi-socialtenant', 'personal:qsi-pensioner',
        'personal:qsi-livingwithpartner', 'personal:qsi-fostercarer',
        'personal:lsi-gender', 'personal:lsi-married', 'personal:lsi-nochildren', 'personal:lsi-student',
        'personal:qsi-healthstatus', 'personal:si-disabilityallowance'];
      fields.forEach(field => {
        if (homeowner.hasOwnProperty(field)) {
          demographicFields[field] = homeowner[field];
        }
      });
      return demographicFields;
    });

    const houseData = homeowners.map(homeowner => {
      const houseFields = {};
      const fields = ['business:lsi-ageofproperty', 'business:lsi-energyrating', 'business:lsi-counciltaxband',
        'business:lsi-propertytype', 'business:lsi-norooms', 'business:lsi-totalfloorarea',
        'business:lsi-yearlyenergycost'];
      fields.forEach(field => {
        if (homeowner.hasOwnProperty(field)) {
          houseFields[field] = homeowner[field];
        }
      });
      return houseFields;
    });

    fs.writeFile(outputFilePath1, JSON.stringify(medicalData, null, 2), err => {
      if (err) {
        console.error("error to wtrite in file:", err);
        return;
      }
      console.log('Medical data has already stored in homeowner-m.json');
    });

    fs.writeFile(outputFilePath2, JSON.stringify(houseData, null, 2), err => {
      if (err) {
        console.error("error to write in file:", err);
        return;
      }
      console.log('House data has stored in homeowner-h.json');
    });

    fs.writeFile(outputFilePath4, JSON.stringify(demographicData, null, 2), err => {
      if (err) {
        console.error("error to write in file:", err);
        return;
      }
      console.log('Demogrphic and medical and address data has stored in homeowner-m-a-d.json');
    });

    fs.writeFile(outputFilePath3, JSON.stringify(financialData, null, 2), err => {
      if (err) {
        console.error("error to write in file:", err);
        return;
      }
      console.log('Financial and fullname data has stored in homeowner-f-f.json');
    });
  });
}

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

//       // 分类
//       const categories = {
//         medical: ['personal:qsi-healthstatus', 'personal:si-disabilityallowance'],
//         demographic: ['personal:si-currentaddress', 'personal:si-ethnicity', 'personal:si-fullname',
//                       'personal:si-dateofbirth', 'personal:si-city', 'personal:si-citizenship',
//                       'personal:si-email', 'personal:lsi-gender', 'personal:lsi-married',
//                       'personal:lsi-nochildren', 'personal:lsi-student', 'personal:si-phoneno',
//                       'personal:hsi-nationalinsurancenumber', 'personal:hsi-passportno',
//                       'personal:qsi-carer', 'personal:qsi-socialtenant', 'personal:qsi-pensioner',
//                       'personal:qsi-livingwithpartner', 'personal:qsi-fostercarer'],
//         housing: ['business:lsi-propertytype', 'business:lsi-norooms', 'business:lsi-ageofproperty',
//                   'business:lsi-energyrating', 'business:lsi-totalfloorarea', 'business:lsi-counciltaxband'],
//         financial: ['business:si-employmentstatus', 'business:si-employer', 'business:lsi-payslip',
//                     'business:hsi-totalamountinbank', 'business:hsi-bankaccountno', 'business:hsi-creditcardno',
//                     'business:hsi-accountbalance', 'business:lsi-yearlyenergycost', 'business:qsi-existingloan',
//                     'personal:si-drivinglicence', 'personal:qsi-spousalmaintenanceincome']
//       };

function profileHOFields() {
  const filePath = path.join(__dirname, 'taggedHomeowners.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error("读取文件时出错:", err);
          return;
      }

      // parse the JSON data
      const jsonData = JSON.parse(data);

      // calculate the number of times each field appears
      const fieldCounts = {};
      jsonData.forEach(record => {
          for (const field in record) {
              if (record[field]) {
                  fieldCounts[field] = (fieldCounts[field] || 0) + 1;
              }
          }
      });

      // calculate the total count
      const totalCount = Object.values(fieldCounts).reduce((sum, count) => sum + count, 0);

      // calculate the percentages of each field
      const fieldPercentages = {};
      for (const field in fieldCounts) {
          fieldPercentages[field] = (fieldCounts[field] / totalCount) * 100;
      }

      // allocate the percentages to the categories
      const medical_hsi = 0;  // medical has no hsi type
      const medical_si = fieldPercentages['personal:si-disabilityallowance'] || 0;
      const medical_qsi = fieldPercentages['personal:qsi-healthstatus'] || 0;
      const medical_lsi = 0;  // medical has no lsi type

      const demographic_hsi = fieldPercentages['personal:hsi-nationalinsurancenumber'] + fieldPercentages['personal:hsi-passportno'];
      const demographic_si = fieldPercentages['personal:si-currentaddress'] + fieldPercentages['personal:si-previousaddress'] + 
                   fieldPercentages['personal:si-fullname'] + fieldPercentages['personal:si-dateofbirth'] + 
                   fieldPercentages['personal:si-city'] + fieldPercentages['personal:si-citizenship'] +
                   fieldPercentages['personal:si-email'] + fieldPercentages['personal:si-phoneno'];
      const demographic_qsi = fieldPercentages['personal:qsi-carer'] + fieldPercentages['personal:qsi-socialtenant'] +
                               fieldPercentages['personal:qsi-pensioner'] + fieldPercentages['personal:qsi-livingwithpartner'] +
                               fieldPercentages['personal:qsi-fostercarer'] + fieldPercentages['personal:qsi-ethnicity']
                               + fieldPercentages['personal:qsi-tenant'];
      const demographic_lsi = fieldPercentages['personal:lsi-gender'] + fieldPercentages['personal:lsi-married'] +
                               fieldPercentages['personal:lsi-nochildren'] + fieldPercentages['personal:lsi-student'];

      const housing_hsi = 0;  // housing has no hsi type
      const housing_si = 0;   // housing has no si type
      const housing_qsi = 0;  // housing has no qsi type
      const housing_lsi = fieldPercentages['business:lsi-propertytype'] + fieldPercentages['business:lsi-norooms'] +
                          fieldPercentages['business:lsi-ageofproperty'] + fieldPercentages['business:lsi-energyrating'] +
                          fieldPercentages['business:lsi-totalfloorarea'] + fieldPercentages['business:lsi-counciltaxband'];

      const financial_hsi = fieldPercentages['business:hsi-totalamountinbank'] + fieldPercentages['business:hsi-bankaccountno'] +
                            fieldPercentages['business:hsi-creditcardno'] + fieldPercentages['business:hsi-accountbalance'];
      const financial_si = fieldPercentages['business:si-employmentstatus'] + fieldPercentages['business:si-employer'] +
                            fieldPercentages['personal:si-drivinglicence'];
      const financial_qsi = fieldPercentages['business:qsi-existingloan'] + fieldPercentages['personal:qsi-spousalmaintenanceincome'];
      const financial_lsi = fieldPercentages['business:lsi-payslip'] + fieldPercentages['business:lsi-yearlyenergycost'];

      //calculate the total percentages
      const total_hsi = medical_hsi + demographic_hsi + housing_hsi + financial_hsi;
      const total_si = medical_si + demographic_si + housing_si + financial_si;
      const total_qsi = medical_qsi + demographic_qsi + housing_qsi + financial_qsi;
      const total_lsi = medical_lsi + demographic_lsi + housing_lsi + financial_lsi;

      // print the results
      console.log("Category-specific Sensitivity Percentages:");
      console.log("Medical: ", {hsi: medical_hsi.toFixed(2) + '%', si: medical_si.toFixed(2) + '%', qsi: medical_qsi.toFixed(2) + '%', lsi: medical_lsi.toFixed(2) + '%'});
      console.log("Demographic: ", {hsi: demographic_hsi.toFixed(2) + '%', si: demographic_si.toFixed(2) + '%', qsi: demographic_qsi.toFixed(2) + '%', lsi: demographic_lsi.toFixed(2) + '%'});
      console.log("Housing: ", {hsi: housing_hsi.toFixed(2) + '%', si: housing_si.toFixed(2) + '%', qsi: housing_qsi.toFixed(2) + '%', lsi: housing_lsi.toFixed(2) + '%'});
      console.log("Financial: ", {hsi: financial_hsi.toFixed(2) + '%', si: financial_si.toFixed(2) + '%', qsi: financial_qsi.toFixed(2) + '%', lsi: financial_lsi.toFixed(2) + '%'});
      console.log("Total: ", {hsi: total_hsi.toFixed(2) + '%', si: total_si.toFixed(2) + '%', qsi: total_qsi.toFixed(2) + '%', lsi: total_lsi.toFixed(2) + '%'});
  });
}

// profileHOFields();
createNewDatawarehouse();





const filePath = '/Users/mark/Downloads/MSC/SystemSecurity/Coursework/Code/taggedhomeowners.json';
const outputPath = '/Users/mark/Downloads/MSC/SystemSecurity/Coursework/Code/keywords.json';

const fs = require('fs');

const fileContent = fs.readFileSync(filePath, 'utf8');
const homeowners = JSON.parse(fileContent);

const keywordCountMap = new Map();

homeowners.forEach(homeowner => {
    Object.keys(homeowner).forEach(key => {
        if (keywordCountMap.has(key)) {
            keywordCountMap.set(key, keywordCountMap.get(key) + 1);
        } else {
            keywordCountMap.set(key, 1);
        }
    });
});

const sortedKeywords = Array.from(keywordCountMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => `${entry[0]} (${entry[1]})`);

fs.writeFileSync(outputPath, JSON.stringify(sortedKeywords, null, 2));

console.log(keywordCountMap);
console.log(sortedKeywords);

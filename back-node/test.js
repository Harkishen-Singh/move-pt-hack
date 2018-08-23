var csv = require('csvtojson');
var fs = require('fs');
csv().fromFile('./info.csv')
    .then(jsonObj => {
        console.warn(jsonObj[0])
        
    })



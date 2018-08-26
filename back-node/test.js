
// var fs = require('fs');
a = '240px';
// console.log(parseInt(a.substr(0,a.length-2)))


const csvFilePath='./date_details.csv'
const csv=require('csvtojson')
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     console.log(jsonObj[0]);
    
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */ 
// })

const fs = require('fs'); 
// const csv = require('csv-parser');

fs.createReadStream('./date_details.csv')
.pipe(csv())
.on('data', function(data){
    // console.warn(data)
    try {
        console.log("Name is: "+data[0]+' '+data[1]);

        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    //some final operation
});  

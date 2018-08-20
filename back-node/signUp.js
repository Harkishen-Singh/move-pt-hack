
const mongo = require('mongodb').MongoClient;
var output = {
    'Success':'N',
    'err':'none',
    'result':[],
};
var isErr=false, unique = false;

function resSend(res) {
    if(isErr==false){
        output.Success='N';
        output.err='some err occuered in signUp.js'
    }
    else{
        output.Success='Y';
        output.err='none';
    }
    res.send(output);
}

function signUps(req, res) {
    let email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        mobile = req.body.mobile,
        port = req.body.port
        

    console.debug(email+username+password+mobile+port)
    res.send('successfully signed Up');
}

module.exports = {
    portAdmin : signUps,
}
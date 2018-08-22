const mongo = require('mongodb').MongoClient,
    url='mongodb+srv://muskan:movehack@cluster0-ldloc.mongodb.net/pt_move?retryWrites=true'
    // url='mongodb://127.0.0.1:27017'
;
var output = {
    'Success':'N',
    'err':'none',
    'result':[],
};
var isErr=false, unique = false;

function resSend(res) {
    if(isErr==true){
        output.Success='N';
        output.err='some err occuered in login.js'
    }
    else{
        output.Success='Y';
        output.err='none';
    }
    res.send(output);
    output.Success='N';
    output.err='none';
    output.result=[];
}

function checkLogin(req,res){
    let email = req.body.username,
        password = req.body.password
        console.warn("User Details Input:"+ email)

        mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('pt_move');
        let obj = {
            'username':email,
            'password':password,
        }

         db.collection('administrator_details').findOne(obj, (e,res2) =>{
            if(e) throw e;
            else
                console.warn('[SUCCESS] user searched with username:'+email);
            console.warn(res2)
            isErr=false;
            dbo.close();
            resSend(res);
        })
     })
    }

module.exports = {
    login:checkLogin,
}
const mongo = require('mongodb').MongoClient,
    // url='mongodb+srv://muskan:movehack@cluster0-ldloc.mongodb.net/pt_move?retryWrites=true'
    url='mongodb://127.0.0.1:27017'
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
    isErr=false;
    output.Success='N';
    output.err='none';
    output.result=[];
}

function checkLogin(req,res){
    let email = req.body.username,
        password = req.body.password
        console.warn("User Details Input:"+ email)

        mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('pt_move');
        let obj = {
            'username':email,
            'password':password,
        }
        console.log('obj', obj)
        db.collection('administrator_details').findOne(obj, null,(e,res2) =>{
            if(e) console.error(e);
            else
                console.warn('[SUCCESS] user searched with username:'+email);
            console.log(e)
            if(res2==null){
                output.Success='N';
                isErr=true;
            } else {
                output.Success = 'Y';
                isErr=false;
                output.result = res2;
            }
            dbo.close();
            resSend(res);
        })
        db.collection('administrator_details').find(obj).toArray((err, docs) => {
            if (err) throw err;
            console.log(docs)
        })
     })
    }

module.exports = {
    login:checkLogin,
}
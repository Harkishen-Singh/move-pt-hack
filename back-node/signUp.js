
const mongo = require('mongodb').MongoClient,
    // url='mongodb+srv://muskan:movehack@cluster0-ldloc.mongodb.net/pt_move?retryWrites=true'
    url='mongodb://127.0.0.1:27017';
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
        output.err='some err occuered in signUp.js'
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

function signUps(req, res) {
    let email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        mobile = req.body.mobile,
        port = req.body.port
    
    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('pt_move');
        colle =  db.listCollections();
        let obj = {
            'email':email,
            'username':username,
            'password':password,
            'mobile':mobile,
            'port':port,
        }
        db.collection('administrator_details').insertOne(obj, (e,res1) =>{
            if(e) console.error(e);
            else
                console.warn('[SUCCESS] inserted into the database with username='+username);
            console.warn(res1)
            isErr=false;
            dbo.close();
            resSend(res);
            
        })
        
    } )

    // console.debug(email+username+password+mobile+port)
}

module.exports = {
    portAdmin : signUps,
}
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

function retriveTags(req, res) {
    let username = req.body.username;
    console.warn('requested username : '+username)
    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        let db = dbo.db('pt_move');
        db.collection('tags').find({"username" : username}).toArray((e, result2) => {
            if(e) throw e;
            console.warn('from db below')
            console.warn(result2)
            isErr=false;
            output.result = result2;
            resSend(res);
            dbo.close();
        })
    })
}



function saveTags(req, res) {
    console.log(req.query.object)
    var a = req.query.object;
    var ainJson = JSON.parse(a);
    console.debug(ainJson) // save this to mongo
    let data = ainJson;
    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        let db = dbo.db('pt_move');
        db.collection('tags').insertMany(data, (e) => {
            if(e) throw e;
            else
                console.warn('inserted multiple records');
                isErr=false;
                resSend(res);

        });
    })
}

module.exports = {
    save : saveTags,
    retrive: retriveTags,
}
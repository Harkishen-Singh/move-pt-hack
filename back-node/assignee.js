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

function addAss(req, res) {
    let username = req.body.username,
        name=req.body.name,
        master=req.body.master,
        task=req.body.task,
        password=req.body.password;

    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        let obj = {
            'username':username,
            'name':name,
            'password':password,
            'master':master,
            'task':task,
        };

        db.collection('assignee').insertOne(obj, e => {
            if(e) console.error(e);
            console.error('added assignee with name : '+name);
            isErr=false;
            resSend(res);
        })
    })
}

function showAll(req, res) {
    let master = req.body.master;
    mongo.connect(url, (e, dbo) => {
        if(e) console.warn(e);
        let db = dbo.db('pt_move');
        db.collection('assignee').find({"master" : master}).toArray((e, result2) => {
            if(e) console.error(e);
            console.warn('from db below showing assignees')
            console.warn(result2)
            isErr=false;
            output.result = result2;
            resSend(res);
            dbo.close();
        })
    })
}
function removeAss(req ,res) {
    let username=req.body.username,
        master = req.body.master;
    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        db.collection('assignee').deleteOne({"master" : master,"username":username},(e, result2) => {
            if(e) console.error(e);
            console.warn('removed assignee : '+username+' by master : '+master);
            isErr=false;
            resSend(res);
            dbo.close();
        })
    })
}
function login(req, res) {
    let username=req.body.username,
        password = req.body.password;
    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        db.collection('assignee').findOne({"username" : username,"password":password},(e, result2) => {
            if(e) console.error(e);
            console.warn('login check below')
            console.warn(result2)
            if(result2==null ){
                isErr=true;
            }
            else{
                isErr=false;
                console.warn(result2)
            output.result = result2;
            }
            
            resSend(res);
            dbo.close();
        })
    })
}

module.exports = {
    add:addAss,
    show:showAll,
    remove:removeAss,
    login:login,
}
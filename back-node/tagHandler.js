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
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        db.collection('tags').find({"username" : username}).toArray((e, result2) => {
            if(e) console.error(e);
            console.warn('from db below')
            console.warn(result2)
            isErr=false;
            output.result = result2;
            resSend(res);
            dbo.close();
        })
    })
}

function dockAssign(req,res) {
    let username = req.body.username, name=req.body.name,id=req.body.id;
    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        db.collection('tags').updateOne({"username" : username, "name":name},{$inc: { 'occupied': 1 }},(e) => {
            if(e) console.error(e);
            console.warn('updated')
            isErr=false;
            dbo.close();
        })

    })

    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        db.collection('schedules').updateOne({"username" : username, "consignmentid":id},{$set: { 'dockassigned': name }},(e) => {
            if(e) console.error(e);
            console.warn('updated')
            isErr=false;
            resSend(res);
            dbo.close();
        })

    })
}

function dockDetails(req, res) {
    let username = req.body.username;
    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        db.collection('tags').find({"username" : username}).toArray((e, result2) => {
            if(e) console.error(e);
            console.warn('from db below')
            console.warn(result2)
            let docks=[]
            for(i=0;i<result2.length;i++){
                if((result2[i]['type'] == 'Passenger' || result2[i]['type'] == 'Cargo' || result2[i]['type'] == 'Others')
                &&
                    (result2[i]['occupied']<result2[i]['capacity'] || result2[i]['occupied']==undefined )  
            ){
                    docks.push(result2[i]);
                }
            }
            console.warn('dock details below')
            console.warn(docks)
            isErr=false;
            output.result = docks;
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
        if(e) console.error(e);
        let db = dbo.db('pt_move');
        db.collection('tags').insertMany(data, (e) => {
            if(e) console.error(e);
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
    dockDetails:dockDetails,
    assign:dockAssign,
}
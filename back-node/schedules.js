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
function add(req,res) {
    let consignmentid=req.body.consignmentid,
        userregtime=req.body.userregtime,
        indentcomm=req.body.indentcomm,
        username=req.body.username,
        indenttrain=req.body.indenttrain,
        type=req.body.type,
        indentwagon=req.body.indentwagon,
        srcstncode=req.body.srcstncode,
        srcdeptime=req.body.srcdeptime,
        disttravel=req.body.disttravel,
        deststncode=req.body.deststncode,
        destarrivaltime=req.body.destarrivaltime,
        unload_strt_time=req.body.unload_strt_time,
        unload_end_time=req.body.unload_end_time;
        mongo.connect(url, (e, dbo) => {
            if(e) throw e;
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('pt_move');
            let obj = {
                'type':type,
                'consignmentid':consignmentid,
                'userregtime':userregtime,
                'indentcomm':indentcomm,
                'indenttrain':indenttrain,
                'indentwagon':indentwagon,
                'username':username,
                'srcstncode':srcstncode,
                'srcdeptime':srcdeptime,
                'disttravel':disttravel,
                'destarrivaltime':destarrivaltime,
                'deststncode':deststncode,
                'unload_strt_time':unload_strt_time,
                'unload_end_time':unload_end_time,
            }
            db.collection('schedules').insertOne(obj, (e,res1) =>{
                if(e) throw e;
                else
                    console.warn('[SUCCESS] inserted into the database with username : '+
                    username+' and condignmentid : '+consignmentid);
                console.warn(res1)
                isErr=false;
                dbo.close();
                resSend(res);
                
            })
            
        } )


}

function retriveAll(req, res) {
    let username = req.body.username;
    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('pt_move');
        
        db.collection('schedules').find({'username':username}).toArray((e, result) => {
            if(e) throw e;
            console.warn('Successfully retrived schedules for username : '+username);
            isErr = false;
            console.warn(result)
            output.result = result;
            dbo.close()
            resSend(res);
        })
        
    } )
}

function deleteSch(req, res) {
    let consignmentid = req.body.id;
    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('pt_move');
        
        db.collection('schedules').deleteOne({'consignmentid':consignmentid}, e => {
            if(e) throw e;
            console.warn('Successfully deleted schedule for consignmentid : '+consignmentid);
            isErr = false;
            dbo.close()
            resSend(res);
        })
        
    } )
}

function details(req, res) {
    let consignmentid = req.body.consignmentid;
    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('pt_move');
        
        db.collection('schedules').findOne({'consignmentid':consignmentid},(e, result) => {
            if(e) throw e;
            console.warn('Successfully retrived schedules for consignmentid : '+consignmentid);
            isErr = false;
            console.warn(result)
            output.result = result;
            dbo.close()
            resSend(res);
        })
        
    } )
}

module.exports = {
    add:add,
    retriveAll:retriveAll,
    details:details,
    delete:deleteSch,
}
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
        output.err='some err occuered in dashboard.js'
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
function chart(req,res){
		var chart = c3.generate({
		    bindto: '#chart',
		    data: {
		      columns: [
		        ['data1', 30, 200, 100, 400, 150, 250],
		        ['data2', 50, 20, 10, 40, 15, 25]
		      ]
		    }
		});
	}

	module.exports={
		dashboard:chart,
	}

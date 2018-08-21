const app = require('express')(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 5000,
    signUp = require('./signUp'),
    url = '0.0.0.0';


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true,
    }));
    app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/', (req ,res) => {
        res.send('this is working');
        
    })
    app.post('/adminSignUp', (req, res) => {
        signUp.portAdmin(req, res);
    })
    app.get('/addTags2', (req, res)=>{
        console.log('works')
        console.log(req.query.object)
        var a = req.query.object;
        var ainJson = JSON.parse(a);
        console.debug(ainJson) // save this to mongo
    })

const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
})

    
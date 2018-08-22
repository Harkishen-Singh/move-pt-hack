const app = require('express')(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 5000,
    signUp = require('./signUp'),
    tags = require('./tagHandler'),
    schedules=require('./schedules'),
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
        tags.save(req,res);
    })
    app.post('/retriveTags', (req, res) => {
        console.warn('request for retrive all tags ');
        
        tags.retrive(req, res);
    })
    app.post('/addSchedules', (req ,res) => {
        schedules.add(req, res);
    })

const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
})

    
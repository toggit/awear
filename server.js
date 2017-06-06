
var dburl = 'mongodb://tomer:1q2w3e4r@ds163681.mlab.com:63681/awear';
// var dburl = 'mongodb://localhost:27017/awear';

//importing modules
var express     = require('express'),
    apiCtrl     = require('./server/controllers/apiCtrl'),
    logger      = require('./server/controllers/loggerCtrl'),
    app         = express(),
    bodyParser  = require('body-parser'),
    http       = require('http'),
    mongoose    = require('mongoose'),
    path        = require('path');


//****************** set port *********************************** */
var port  = process.env.PORT || 5000;

logger.info("starting Aware Application")
//****************** MongoDB Connections ****************************
//overwrite mongoose promise with promise module
mongoose.Promise = require('promise');


logger.info("connect to mongodb")
//connecting to mongo db
mongoose.connect(dburl);

//check if mongoose successfuly to connect mongodb
mongoose.connection.on('connected', function () {  
  logger.info('Mongoose Connected to ' + dburl)
}); 

//check if mongoose failed to connect mongodb
mongoose.connection.on('error',function (err) {  
  logger.info('Mongoose Failed to Connect DB error: ' + err);
}); 

// check if mongoose is disconnected
mongoose.connection.on('disconnected', function () {
  logger.info('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

//****************** static resource *****************************
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'client/dist')));

//**************** ajax resource ****************************
//allow cross-origin HTTP Requested
/*
app.use(function(req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
*/

//index.html
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'client/dist/index.html'));
});

//*************** Rest Api links ******************
app.post('/api/reports', apiCtrl.getReports);


//*************  Start Server ***********************  

http.createServer(app).listen(port,function(){
    logger.info("start listening...")
});

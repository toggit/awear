//Define Logger 

var winston = require('winston');
var MongoDB = require('winston-mongodb').MongoDB;

// var dburl = 'mongodb://localhost:27017/awear';
var dburl = 'mongodb://tomer:1q2w3e4r@ds163681.mlab.com:63681/awear';


// registring Logger and binding it to console and mongodb
var logger = new (winston.Logger)({
  transports: [
   	new (winston.transports.Console)(),
    new (winston.transports.MongoDB)({db: dburl})	
  ]
});

//exporting Logger
module.exports = logger


// Examples :
//logger.info('info test');
//logger.debug('debug test');
//logger.info('why');
//logger.log('info','info test');
//logger.log('warn','warn test');

//winston.add(winston.transports.MongoDB, {db:dburl});
//winston.level = 'error';
//winston.log('info','Hello distributed logs');

//logger.log('error', 'Now my debug messages are written to console!');
//winston.log('info', 'Test Log Message', { anything: 'This is metadata' });



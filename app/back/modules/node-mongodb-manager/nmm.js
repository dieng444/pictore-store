/**************************************************
* An Node.js module for MongoDB database manager  *
***************************************************/
/**************************************************
*                   Dependencies                  *
***************************************************/
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var config = require('./config');
var db = null; //static variable shared by all instances

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a NodeMongodbManager
* @constructor
*/
module.exports = function() {

    /**private variable database port*/
    var port = config.dbPort;

    /**private variable database host*/
    var host = config.dbHost;

    /**private variable database name*/
    var name = config.dbName;

    /**private variable errors array, allows to store errors*/
    var errors = new Array();

    /****Errors checking***/
    if(port==null) {
			errors.push({
        database:db,
				code:400,
				messgae:'Database port can\'t be null, port = '+port
		 	});
	 }
   if(host==null) {
			errors.push({
        database:db,
				code:400,
				messgae:'Database host can\'t be null, host = '+host
			});
		}
    if(name==null) {
			errors.push({
        database:db,
				code:400,
				messgae:'Database name can\'t be null, name = '+name
			});
		}
    /****
    * In the case where the manager is instantiated as new NodeMongodbManager()
    * without being followed by GetDB method, the following condition
    * will automatically display errors if there has
    */
    if (errors.length > 0 ) {
        console.log('Errors occurred on NodeMongodbManager...');
        console.log(errors);
      }
    /**
    * public method
    * Return mongodb database unique instance
    * @return MongoDB
    */
    this.getDB = function() {
        if(db!=null) { //do not create a new db instance if there is one that exists
          return db;
        }
        if(errors.length > 0 ) { //Stopped the program if errors occurred
          return;
        }
				db = new MongoDB(name, new Server(host, port, {auto_reconnect: true}), {w: 1});
        db.open(function(e, d){
        	if (e) {
        		console.log(e);
        	}	else{
        		console.log('connected to database :: ' + config.dbName);
        	}
        });
				return db; //sending the instance when all went well
    }
}

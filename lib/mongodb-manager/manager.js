/**************************************************
* An Nodejs module for MongoDB database manager   *
***************************************************/
/**************************************************
*                   Dependencies                  *
***************************************************/
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var config = require('./config');
/**static variable shared by all instances*/
var db = null;

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a NodeMongodbManager
* @constructor
*/
module.exports = function() {

    /**Private variable, the database port*/
    var port = config.dbPort;

    /**Private variable, the database host*/
    var host = config.dbHost;

    /**Private variable, the database name*/
    var name = config.dbName;

    /**
    * Private helper function, allows to display errors
    * @param {string} msg - message to display in the error
    */
    var displayErrors = function(msg) {
      var err = {database:db, code:400, messgae:msg };
      console.log('Errors occurred on NodeMongodbManager...');
      console.log(err);
      console.log('You should maybe check parameters definition in the config.js file...');
      return;
    }
    /****Errors checking***/
    if(port==null) {
      displayErrors('Database port can\'t be null, port = '+port);
	  }
    if(host==null) {
      displayErrors('Database host can\'t be null, host = '+host);
    }
    if(name==null) {
      displayErrors('Database name can\'t be null, name = '+name);
    }
    /**
    * public function
    * Return mongodb database unique instance
    * @return MongoDB
    */
    this.getDB = function() {
        if(db!=null) { //do not create a new db instance if there is one that exists
          return db;
        }
				db = new MongoDB(name, new Server(host, port, {auto_reconnect: true}), {w: 1});
        db.open(function(e, d){
        	if (e) {
        		console.log(e);
        	}	else{
        		console.log('connected to database :: ' + config.dbName);
        	}
        });
				return db;
    }
}

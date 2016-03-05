/****Dependencies**/
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;

/**
* An Node.js module for MongoDB database manager
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a manager
* @constructor
* @param {int} port - the database port:
* @param {string} host - the database host:
* @param {name} name - the database name:
*/
module.exports = function(port, host, name) {

    /**database port*/
    this.port = port;

    /**database host*/
    this.host = host;

    /**database name*/
    this.name = name;

    /**Allows to check if an instance already exists*/
    this.isDbInstanceCreated = false;

    /**Database instance variable*/
    this.db = null;

    /**Errors array, allows to store errors*/
    this.errors = new Array();

    /****Errors checking***/
    if(this.port==null) {
			this.errors.push({
        database:this.db,
				code:400,
				messgae:'Database port can\'t be null, port = '+this.port
		 	});
	 }
   if(this.host==null) {
			this.errors.push({
        database:this.db,
				code:400,
				messgae:'Database host can\'t be null, host = '+this.host
			});
		}
    if(this.name==null) {
			this.errors.push({
        database:this.db,
				code:400,
				messgae:'Database name can\'t be null, name = '+this.name
			});
		}
    /****
    * In the case where the manager is instantiated as new NodeMongodbManager()
    * without being followed by GetDB method, the following condition
    * will automatically display errors if there has
    */
    if (this.errors.length > 0 ) {
        console.log('Errors occurred on NodeMongodbManager...');
        console.log(this.errors);
      }
    /**
    * Return mongodb database unique instance
    * @return MongoDB
    */
    this.getDB = function() {
        if (this.errors.length > 0 ) return; //Stopped the program if errors occurred
				if (!this.isDbInstanceCreated) {
						this.db = new MongoDB(this.name, new Server(this.host, this.port, {auto_reconnect: true}), {w: 1});
	          this.db.open(function(e, d){
	          	if (e) {
	          		console.log(e);
	          	}	else{
	          		console.log('connected to database :: ' + name);
	          	}
	          });
						this.isDbInstanceCreated = true; //The control boolean pass to true for the next connection
						return this.db; //sending the instance when all went well
        } else {
	          this.errors.push({
                code:400,
                message:'An instance of NodeMongodbManager has already been created, you can\'t create an other one...'
            });
            this.displayErrors();
        }
    }
    /**
    * Allows to display errors
    */
    this.displayErrors = function() {
      if (this.errors.length > 0 ) {
          console.log('Errors occurred on NodeMongodbManager...');
          console.log(this.errors);
          return;
        }
    }
}

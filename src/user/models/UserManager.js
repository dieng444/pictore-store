var util = require('util');
var User = require('../entities/User');
var MainManager = require('./MainManager');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a UserManager
* @constructor
*/
function UserManager() {

  /**
  * The collection to use for this manager
  */
  var collection = 'users';

  /***
  * Calling the super manager constructor
  */
  MainManager.call(this, collection, User);
}
/*******************
* Bind your manager to the super manager here by completing the first parameter
*******************/
util.inherits(UserManager,MainManager);
/******Exporting the module**********/
module.exports = UserManager;

var param = require('../../app/parameter');
/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a AuthManager, allows to manage user connection
* @class
* @property {Object} providerModel - the model to use for check current user existence
* @property {string} loginField - the field representing user login in document
* @property {string} passwordField - the field representing password in the document
* @property {string} logoutPath - the path to redirect to when user logout
* @property {string} filter - filter to use for retrieve user in document collection
*/
function AuthManager() {

  /***Private var, current user provider model*/
  var providerModel = new param.providerModel();

  /***Private var, login field in the document collection*/
  var loginField = param.loginField;

  /***Private var, password field in the document collection*/
  var passwordField = param.passwordProperty;

  /***Private var, logout redirection path*/
  var logoutPath = param.logoutPath;

  /***Private var, retrieving user filter**/
  var filter = {};

  /**
  * @method
  * Chekcs if current user is a valid user from database
  * @param {Request} req - Express current request
  * @param {Response} res - Express current response
  * @param {function} callback - function to call after checking
  * @return {boolean}
  */
  this.checkAuthentication = function(req, res, callback) {
    filter[loginField] = req.body[loginField],
    filter[passwordField] = req.body[passwordField];
    providerModel.findOneBy(filter, function(err,user) {
      if(!err && user!=null) {
        req.session.user = user; //Creating a session for the current user
        callback(err,true);
      } else callback(err,false);
    })
  }

  /**
  * @method
  * Chekcs if the current user is connected
  * @param {Request} req - Express current request
  * @param {Response} res - Express current response
  * @param {function} callback - function to call after checking
  * @return {boolean}
  */
  this.isConnected = function(req, res, callback) {
    if(req.session.user!=null) callback(true);
    else callback(false);
  }

  /**
  * @method
  * Chekcs if the current user has some rome
  * @param {string} role - the role to be checked
  * @return {boolean}
  */
  this.isGrantedRole = function(role) {
    this.isConnected(req,res, function(err,yes) {
      if(yes) {
        if(req.session.user.getRole()==role) callback(true);
        else callback(false);
      } else console.log("There are no connected user");
    })
  }

  /**
  * @method
  * Allows to logout current user
  * @param {Request} req - Express current request
  * @param {Response} res - Express current response
  * @return {boolean}
  */
  this.logout = function(req,res) {
    req.session.user = null;
    res.redirect(logoutPath);
  }
}

module.exports = AuthManager;

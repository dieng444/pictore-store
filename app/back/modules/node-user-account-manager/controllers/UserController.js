
/****Dependencies*****/
var UserManager = require('../models/UserManager');
var User = require('../entities/User');

module.exports = function() {

  var manager = new UserManager();

  this.registerAction = function(req, res) {
    var user = new User(req.body);
    //console.log(user.getCollection());
    manager.persist(user);
    manager.save();
  }
  this.updateAction = function(req, res) {
    console.log("updateUserAction ok!");
  }
  this.removeAction = function(req, res) {
    console.log("removeUser ok!");
  }
  this.loginAction = function(req, res) {
    console.log("LoginAction ok!");
  }
  this.logoutAction = function(req, res) {
    console.log("logoutAction ok!");
  }

}

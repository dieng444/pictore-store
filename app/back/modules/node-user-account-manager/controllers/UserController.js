
/****Dependencies*****/
var UserManager = require('../models/UserManager');
var User = require('../entities/User');
module.exports = function() {

  var manager = new UserManager();

  this.registerAction = function(req, res) {
    var user = new User(req.body);
    //console.log(user);
    console.log(user.getFirstName());
    user.setFirstName("Macky");
    console.log(user.getFirstName());
    /*console.log(user.getLastName());
    console.log(user.getEmail());
    console.log(user.getPassword());*/
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

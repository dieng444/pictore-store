
/****Dependencies*****/
var UserManager = require('../models/UserManager');
var User = require('../entities/User');

module.exports = function() {

  var manager = new UserManager();

  this.registerAction = function(req, res) {
    var user = new User(req.body);
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
    manager.find(req.body.login, function(err,user){
      console.log(user.getFirstName());
      console.log(user.getId());
    });
  }
  this.logoutAction = function(req, res) {
    console.log("logoutAction ok!");
  }
  this.adminAction = function(req, res) {
    manager.findAll(function(err,data) {
      console.log(data);
    });
  }
  this.userAlbumsAction = function(req, res) {
    manager.findBy({firstName:"Baptiste"},function(err, albums) {
      console.log("list albums yes...");
      console.log(albums);
    });
  }
  this.albumAction = function(req, res) {
    manager.findOneBy({firstName:"Baptiste"},function(err, album) {
      console.log("album yes...");
      console.log(album);
    });
  }
  this.deleteUserAccountAction = function(req,res) {
    manager.find(req.params.id, function(err,user){
      manager.remove(user,function(err,result) {
        console.log(result);
      });
    });
  }
  this.updateAction = function(req,res) {
    var data = req.body;
    manager.find(data.id, function(err,user){
      if (err) {
        console.log(err);
      } else {
        user.setFirstName(data.firstName);
        user.setLastName(data.lastName);
        user.setEmail(data.email);
        user.setPassword(data.password);
        manager.persist(user);
        manager.save();
      }
    });
  }
}

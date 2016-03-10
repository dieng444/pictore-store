
var UserManager = require('../models/UserManager');
var User = require('../entities/User');

module.exports = function() {

  var manager = new UserManager();

  this.registerAction = function(req, res) {
    var user = new User({});
    manager.persist();
    manager.save();
  }
  this.removeAction = function(req, res) {
    console.log("removeUser ok!");
  }
  this.loginAction = function(req, res) {
    manager.findOneBy({email: req.params.login},function(user){
      console.log(user);
    });
  }
  this.logoutAction = function(req, res) {
    console.log("logoutAction ok!");
  }
  this.adminAction = function(req, res) {
    manager.findAll(function(data) {
      console.log(data);
    });
  }
  this.userAlbumsAction = function(req, res) {
    manager.findAllBy({firstName:"Baptiste"},function(albums) {
      console.log("list albums yes...");
      console.log(albums);
    });
  }
  this.albumAction = function(req, res) {
    manager.findOneBy({firstName:"Baptiste"},function(album) {
      console.log("album yes...");
      console.log(album);
    });
  }
  this.deleteUserAccountAction = function(req,res) {
    manager.findOne(req.params.id, function(user){
      console.log(user);
      manager.remove(user,function(result) {
        console.log(result);
      });
    });
  }
  this.updateAction = function(req,res) {
    var data = req.body;
    manager.findOne(data.id, function(user) {
      if (user!==null) {
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

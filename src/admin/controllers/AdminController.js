
var User = require('../entities/User')
  , Bucket = require('../../bucket/entities/Bucket')
  , UserModel = require('../models/UserModel')
  , BucketModel = require('../../bucket/models/BucketModel')
  , BucketManager = require('../../../lib/bucket-manager/manager');

function AdminController() {

  var umodel = new UserModel();
  var bmodel = new BucketModel();
  var bmanager = new BucketManager();

  this.listAction = function(req, res) {
    console.log("removeUser ok!");
  }
  this.removeAction = function(req, res) {
    umodel.findOne(req.params.id, function(user){
      console.log(user);
      umodel.remove(user,function(result) {
        console.log(result);
      });
    });
  }
  this.adminAction = function(req, res) {
    umodel.findAll(function(data) {
      console.log(data);
    });
  }
}

module.exports = UserController;


var User = require('../entities/User')
  , Bucket = require('../../bucket/entities/Bucket')
  , UserModel = require('../models/UserModel')
  , BucketModel = require('../../bucket/models/BucketModel')
  , BucketManager = require('../../../lib/bucket-manager/manager');

function UserController() {

  var umodel = new UserModel();
  var bmodel = new BucketModel();
  var bmanager = new BucketManager();

  this.registerAction = function(req, res) {
    var user = new User(req.body);
    var bucketName = user.getFirstName()+'.'+user.getLastName()+'.'+Date.now();
    var params = { Bucket: bucketName, ACL: 'private'};
    umodel.save(user,function(e, result) {
      if(!e) {
        var data = {name:bucketName, owner: result.lastInsertedId};
        var bucket = new Bucket(data);
        bmanager.createBucket(params, function(er, result) {
          if(!er) {
            bmodel.save(bucket, function(err,result) {
              if(!err) res.redirect('/');
            });
          }
        });
      }
    });
  }
  this.loginAction = function(req, res) {
    umodel.findOneBy({email: req.params.login},function(user){
      console.log(user);
    });
  }
  this.logoutAction = function(req, res) {
    console.log("logoutAction ok!");
  }
  this.userAlbumsAction = function(req, res) {
    umodel.findAllBy({firstName:"Baptiste"},function(albums) {
      console.log("list albums yes...");
      console.log(albums);
    });
  }
  this.albumAction = function(req, res) {
    umodel.findOneBy({firstName:"Baptiste"},function(album) {
      console.log("album yes...");
      console.log(album);
    });
  }
  this.updateAction = function(req,res) {
    var data = req.body;
    umodel.findOne(data.id, function(user) {
      if (user!==null) {
        user.setFirstName(data.firstName);
        user.setLastName(data.lastName);
        user.setEmail(data.email);
        user.setPassword(data.password);
        umodel.persist(user);
        umodel.save();
      }
    });
  }
}

module.exports = UserController;

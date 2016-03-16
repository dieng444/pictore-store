
var User = require('../entities/User')
  , Bucket = require('../../bucket/entities/Bucket')
  , UserModel = require('../models/UserModel')
  , BucketModel = require('../../bucket/models/BucketModel')
  , BucketManager = require('../../../lib/bucket-manager/manager')
  , Auth = require('../../../lib/auth-manager/auth');

function UserController() {

  var umodel = new UserModel()
    , bmodel = new BucketModel()
    , bmanager = new BucketManager()
    , auth = new Auth();

  this.registerAction = function(req, res) {
    var user = new User(req.body)
      , bucketName = user.getFirstName()+'.'+user.getLastName()+'.'+Date.now()
      , params = { Bucket: bucketName, ACL: 'private'};
    user.setRole('ROLE_USER');
    umodel.save(user,function(err, result) {
      if(!err) {
        var data = {name:bucketName, owner: result.lastInsertedId};
        var bucket = new Bucket(data);
        return res.redirect('/');
        bmanager.createBucket(params, function(err, result) {
          if(!err) {
            bmodel.save(bucket, function(err,result) {
              if(!err) res.redirect('/');
            });
          }
        });
      }
    });
  }
  this.loginAction = function(req,res) {
    auth.checkAuthentication(req, res, function(err,isOk) {
      if(isOk) {
        console.log(req.session.user);
        res.render('layout',{successMsg:"Vous êtes maintenant connecté."});
      } else {
        res.render('layout',{errorMsg:"Identifiant ou mot de passe incorrecte."});
      }
    });
  }
  this.logoutAction = function(req, res) {
    auth.logout(req,res);
  }
  this.userAlbumsAction = function(req, res) {
    umodel.findAllBy({firstName:"Baptiste"},function(albums) {
      console.log("list albums yes...");
      console.log(albums);
    });
  }
  this.updateAction = function(req,res) {
    auth.isConnected(req, res, function(response) {
      if(response) {
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
      } else {
        res.render('layout',{errorMsg:"Vou devez être connecté pour effectuer cette action."});
      }
    })

  }
}

module.exports = UserController;

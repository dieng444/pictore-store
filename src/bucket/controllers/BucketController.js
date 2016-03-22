var multer = require('multer')
  , util = require('../../../lib/utils/util')
  , Auth = require('../../../lib/auth-manager/auth')
  , fs = require('fs')
  , ObjectID = require('mongodb').ObjectID
  , BucketManager = require('../../../lib/bucket-manager/manager')
  , AlbumModel = require('../models/AlbumModel')
  , BucketModel = require('../models/BucketModel')
  , ImageModel = require('../models/ImageModel')
  , Album = require('../entities/Album')
  , Image = require('../entities/Image');

function BucketController() {

  var bmanager = new BucketManager()
    , bmodel = new BucketModel()
    , amodel = new AlbumModel()
    , imodel = new ImageModel()
    , auth = new Auth().getInstance();

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'ui/public/uploads/images/');
    },
    filename: function (req, file, callback) {
      var newName = util.getUniqueFileName(file.originalname);
      callback(null,newName);
    }
  });

  var upload = multer({ storage : storage }).array('uploadedImages',10);

  this.albumsAction = function(req,res) {
    auth.isConnected(req, res,function(resp){
      var user = auth.getUser()
      if (resp) {
        bmodel.findOneBy({owner:user.getId()}, function(err, bucket){
          amodel.findAllBy({bucket:bucket.getId()}, function(err,albums) {
            if (!err) {
              res.render('bucket/albums',{
                user:user, albums:albums, bucket:bucket
              });
            }
          })
        })
      } else res.redirect('/login');
    })
  }
  this.albumAction = function(req,res) {
    auth.isConnected(req, res,function(resp){
      if(resp) {
        var user = auth.getUser();
        amodel.findOne(req.params.id, function(err, album) {
          if(!err) {
            if(album!=null) {
              imodel.findAllBy({album:album.getId()}, function(err,images) {
                if (!err) {
                  res.render('bucket/albumDetail',{user:user,images:images});
                }
              })
            }
          } else res.render('500', util.getStatusMessage(500));
        })
      } else res.redirect('/login');
    });
  }
  this.addAlbumAction = function(req, res) {
    bmodel.findOne(req.body.bucketId, function(err, bucket) { //Getting the bucket of the current user
      if(!err) {
        var d = new Date()
          , day = d.getDate()
          , n = d.getMonth()
          , year = d.getFullYear()
          , date = day+' '+util.getStringMonth()[n]+' '+year;

        var albumName = req.body.name.replace(' ','_')+'/'
          , params = {
            Bucket: bucket.getName(),
            ACL: 'private',
            Key: albumName,
            Body: 'nada'
          }
          , data = {
            name: req.body.name.replace(' ','_'),
            originalName : req.body.name,
            location: req.body.location,
            createdDate: date,
            bucket: bucket.getId()
          }
          , album = new Album(data);

        amodel.save(album, function(err, result) { //Saving the album in database
          if(!err) {
            bmanager.sendObject(params, function(err, result){ //sending the album to aws cloud
              if(!err) res.redirect('/albums');
              else console.log(err);
            });
          }
        });
      }
    });
  }
  this.updateAlbumAction = function(req,res) {
    amodel.findOne(req.body.id, function(err, album) {
      if(!err) {
        album.setName(req.body.name);
        amodel.save(album, function(er,result) {
          if(!er) res.redirect('/');
          else console.log(er);
        })
      }
    })
  }
  var sendFile = function(file, bucketName, albumName, albumId) {
    var params = {
      Bucket: bucketName,
      Key: albumName+'/'+file.filename,
      ACL: 'public-read'
    };
    bmanager.sendFileObject(file.path, params, function(err,result) { //Sending file to aws cloud
      if(!err) {
        var data = {name: file.filename, album: albumId, visibility:true};
        var image = new Image(data);
        imodel.save(image, function(err,result) { if(err) console.log(err); });
      } else console.log(err);
    });
  }
  this.addImagesAction = function(req, res) {
    upload(req, res, function(err) { //uploading files on server disk
      amodel.findOne(req.body.id, function(err, album) { //Getting images container album
        if (!err && album!=null) {
          bmodel.findOne(album.getBucket(), function(err, bucket) { //Getting the bucket of the current user
            if(!err) {
              var files = req.files;
              for(i in files)
                sendFile(files[i],bucket.getName(),album.getName(),album.getId());
              res.redirect('/');
            } else console.log(err);
          });
        } else {
          for(i in req.files) {
            fs.unlink(req.files[i].path, function(errs) { //Delete files on server disk when errors occured
              if (errs) console.error(errs);
            });
          }
        }
      });
    });
  }
  this.deleteBucketAction = function (req,res) {
    var id = req.params.id;
    var bucket = amodel.findOne(id);
    //var objectsToDelete = list of all users albums with their images
    var params = {Bucket: bucket.getName(), Delete: {Objects: objectsToDelete}};
    var bcktParam = {Bucket: bucket.getName()};
    bmanager.deleteObjects(objectsParams); //Deleting all albums with there contents
    bmanager.deleteBucket(bcktParam); //Now bucket is empty we can delete it
    /*
    remove all images and albums before
    amodel.remove(bucket);
    */
    res.redirect('/');
  }
  this.deleteAlbumAction = function(req,res) {
    var id = new ObjectID(req.params.id);
    imodel.findAllBy({album:id}, function(err, images) {
      if(!err) {
        if(images.length==0) {
          amodel.findOne(id,function(err, album) {
            if(!err) {
              amodel.remove(album, function(err,resul) {});
              res.render('layout',{successMsg:"Suppression effectuée avac succès."});
            }
          })
        } else {
          res.render('layout',{errorMsg:"Vous ne pouvez pas supprimer un album qui contient encore des images"});
        }
      }
      else console.log(err);
    })
  }
  this.deleteImageAction = function(req,res) {
    imodel.findOne(req.params.id, function(err, image) {
      console.log(image);
      if(!err) {
        imodel.remove(image, function(er,result) {
          if(!er) res.redirect('/');
          else console.log(er);
        })
      } else console.log(err);
    })
  }
}

module.exports = BucketController;

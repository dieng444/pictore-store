var multer = require('multer');
var BucketManager = require('../../../lib/bucket-manager/manager');

function BucketController() {

  var bm = new BucketManager();

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'ui/uploads/images/');
    },
    filename: function (req, file, callback) {
      var newName = bm.getUniqueFileName(file.originalname);
      callback(null,newName);
    }
  });

  var upload = multer({ storage : storage }).array('uploadedImages',10);

  this.addBucketAction = function(req,res) {
    var bucketName = req.body.fname+'.'+req.body.lname+'.'+Date.now();
    var params = { Bucket: bucketName, ACL: 'private'};
    var data = {name:bucketName,user:req.body.email};
    var bucket = new Bucket(data);
    md.createBucket(params);
    manager.persist(bucket);
    manager.save();
  }
  this.addAlbumAction = function() {
    var albumName = req.body.nam+'/';
    var params = {Bucket: 'Macky.Dieng.1457022074750',ACL: 'private',Key : albumName,Body: 'nada'};
    var data = { name:req.body.name, bucket:"macky.dieng.66778", visibility: true};
    var album = new Album(data);
    bm.sendObject(params);
    manager.persist(album);
    managaer.save()
  }
  this.addFilesAction = function(req, res) {
    upload(req, res, function(err) {
        if(err) console.log(err);
        var files = req.files;
        for(i in files) {
          var params = { Bucket: 'Macky.Dieng.1457022074750', Key: 'test/'+files[i].filename, ACL: 'public-read'};
          bm.sendFileObject(files[i].path, params);
          var data = {name:files[i].filename, album:"paris", visibility:true};
          var image = new image(data);
          manager.persist(image);
        }
        manager.save();
    });
  }
  this.deleteBucketAction = function (req,res) {
    var id = req.params.id;
    var bucket = manager.findOne(id);
    //var objectsToDelete = list of all users albums with their images
    var params = {Bucket: bucket.getName(), Delete: {Objects: objectsToDelete}};
    var bcktParam = {Bucket: bucket.getName()};
    bm.deleteObjects(objectsParams); //Deleting all albums with there contents
    bm.deleteBucket(bcktParam); //Now bucket is empty we can delete it
    /*
    remove all images and albums before
    manager.remove(bucket);
    */
    res.redirect('/');
  }
  this.deleteAlbumAction = function(req,res) {
    var id = req.params.id;
    var album = manager.findOne(id);
    manager.remove(album);
  }
  this.deleteImageAction = function(req,res) {
    var id = req.params.id;
    var album = manager.findOne(id);
    manager.remove(album);
  }
}

module.exports = BucketController;

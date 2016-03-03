var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ejs = require('ejs');
var fs = require('fs');
var multer = require('multer');
var AWS = require('aws-sdk');
var MdAws = require('./md-aws/md-aws');
//AWS.config.region = 'us-standard';
//Link api http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//Tutorial link http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
//Multiple uploads https://codeforgeek.com/2016/01/multiple-file-upload-node-js/
//https://github.com/braitsch/node-login

var app = express();
var s3 = new AWS.S3();
var mdaws = new MdAws(s3);

var params = {
  Bucket: 'mackydieng.vacances', /* required */
};
function read() {
  var items = mdaws.findAllObjects(params);
  console.log(items);
  for (var index in items) {
    var item = items[index];
    console.log(item.Key);
  }
}
//read();
// Read in the file, convert it to base64, store to S3

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'ui/uploads/images/');
  },
  filename: function (req, file, callback) {
    var newName = mdaws.getUniqFileName(file.originalname);
    callback(null,newName);
  }
});
var upload = multer({ storage : storage }).array('uploadedImages',10);
/**
* Helper method allows to externalize parameters
* @return Object
*/
function getObjectsParams(albumDeleteAble,bucket) {
  var img1 = 'test/photo10_1457020855230.jpg',
      img2 = 'test/photo11_1457020855220.jpg',
      img3 = 'test/photo12_1457020855212.jpg',
      album = 'test/';
  var objectsToDelete = [{Key: img1},{Key: img2},{Key: img3}];
  //var albumDeleteAble = false;
  if (albumDeleteAble) { //Checks if album delete able
      //Retrieve all images for the sended album (user will send album name from request)
      //and join themes to the objects to delete
      //be sure that the album item is the last one in the array
      objectsToDelete.push({Key:album});
   }
  var params = {
    Bucket: bucket,
    Delete: {Objects: objectsToDelete}
  };
  return params;
}
/**
 * Spécification du chemin des fichiers static
 * */
app.use(express.static(__dirname + '/ui'))
app.use(express.static(__dirname + '/node_modules'))
app.use(bodyParser.json())

/**
 * Route par défaut (le home)
 * */
.get('/', function(req, res) {
    res.render('index.ejs', {});
})
/**
 * Route par d'upload d'une image
 * */
.post('/uploadFiles', function(req, res) {
    upload(req,res,function(err) {
        if(err) { console.log(err); }
        req.files.forEach(function (item, index, array) {
          //console.log(s3);
          var params = {
            Bucket: 'Macky.Dieng.1457022074750',
            Key: 'test/'+item.filename,
            ACL: 'public-read'
          };
          mdaws.sendFileObject(fs, item.path, params);
        })
        //console.log(req.files);
        console.log("File is uploaded");
    });
  res.redirect('/');
})
/**
* Register user and create he bucket automatically
**/
.post('/register', urlencodedParser,function(req,res) {
    //console.log(req.body);
    var bucketName = req.body.fname+'.'+req.body.lname+'.'+Date.now();
    var params = { Bucket: bucketName, ACL: 'private'};
    mdaws.createBucket(params);
    res.redirect('/');
})

/**
* Route that allows to create user albums
**/
.post('/album/create', urlencodedParser,function(req,res) {
    var albumName = req.body.name+'.'+Date.now()+'/';
    var params = {
      Bucket: 'Macky.Dieng.1457022074750',
      ACL: 'private',
      Key : albumName,
      Body: 'nada'
    };
    mdaws.sendObject(params);
    res.redirect('/');
})
/**
* Route for delete specifical bucket
*/
.get('/bucket/delete/:name', function(req,res) {
    var bucketName = req.params.name;
    var objectsParams = getObjectsParams(true,bucketName);
    mdaws.deleteObjects(objectsParams); //Deleting all albums with there contents
    var params = {Bucket: bucketName};
    mdaws.deleteBucket(params); //Now bucket is empty we can delete it
    res.redirect('/');
})
/**
* Route for delete many objects
*/
.get('/objects/delete', function(req,res) {
    var objectsParams = getObjectsParams(true,'Macky.Dieng.1457022074750');
    mdaws.deleteObjects(objectsParams);
    res.redirect('/');
})
/**
 * Launtching the server on port 3000
 * */
app.listen(3000);
console.log("Le serveur écoute sur le port 3000");

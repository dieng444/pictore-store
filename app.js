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
var upload = multer({ storage : storage }).array('uploadedImages',3);
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
            Bucket: 'mackydieng.vacances',
            Key: 'paris/'+item.filename,
            ACL: 'public-read'
          };
          mdaws.sendObject(fs, item.path, s3, params);
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
    console.log(req.body);
    res.redirect('/');
})
/**
* Create user albums route
**/
.post('/album/create', urlencodedParser,function(req,res) {
    console.log(req.body);
    res.redirect('/');
})
/**
 * Lancement du serveur sur le port 3000
 * */
app.listen(3000);
console.log("Le serveur écoute sur le port 3000");

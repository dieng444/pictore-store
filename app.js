var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ejs = require('ejs');
var fs = require('fs');
var AWS = require('aws-sdk');
//AWS.config.region = 'us-standard';
//Link api http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//Tutorial link http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html

var app = express();

var s3 = new AWS.S3();
var params = {
  Bucket: 'mackydieng.vacanecs', /* required */
};
function findAllObjects() {
  s3.listObjects(params,function(err, data) {
    console.log(data);
    if (err) { console.log("Error:", err); }
    else {
      var items  = data.Contents;
      for (var index in items) {
        var item = items[index];
        console.log(item.Key);
        ///console.log("Bucket: ", bucket.Name, '\ndate : ', bucket.CreationDate);
      }
      //console.log(data);
    }
  });
}
findAllObjects();
// Read in the file, convert it to base64, store to S3
function sendObject() {
  var fileName = 'ui/uploads/images/image_1.jpg';
  fs.readFile(fileName, function (err, data) {
    if (err) { throw err; }
    var params = {Bucket: 'mackydieng.vacances', Key: 'paris/toure-eiffel.jgp', Body: data};
    s3.putObject(params, function(err, data) {
        if (err)
            console.log(err)
        else
            console.log("Successfully uploaded data to myBucket/myKey");
      });
  });
}
/**
 * Spécification du chemin des fichiers static
 * */
app.use(express.static(__dirname + '/ui'))
app.use(express.static(__dirname + '/node_modules'))
/**
 * Route par défaut (le home)
 * */
.get('/', function(req, res) {
    res.render('index.ejs', {});
})
/**
 * Lancement du serveur sur le port 3000
 * */
app.listen(3000);
console.log("Le serveur écoute sur le port 3000");

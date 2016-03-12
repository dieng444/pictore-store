var AWS = require('aws-sdk');
var fs = require('fs');
/**
* Module Macky Dieng - amazon Web Service
*/
module.exports = function () {
    var data = null;
    var s3 = new AWS.S3();

  /**
  * Allows to find all object list on an aws bucket
  * @param params the parameters for aws
  */
  this.findAllObjects = function(params) {
    s3.listObjects(params,function(err, data) {
      if (err) { console.log("Error:", err); }
      else {
        //assignValue(data.Contents);
      }
    });
  }
  /**
  * Allow to send object to the aws
  */
  this.sendFileObject = function(fs, fileName, params) {
      fs.readFile(fileName, function (err, data) {
        if (err) { throw err; }
        params.Body = data; //handle readFile data to params Body
        s3.putObject(params, function(err, data) { //upload file in the cloud
            if (err) {
              console.log(err)
            } else {
              fs.unlink(fileName, function(err) { //Delete file on server disk
                if (err)
                    console.error(err);
                else
                  console.log("Files uploaded successfully...");
              });
            }
          });
      });
  }
  /**
  * Allows to have uniq file name
  * @param file : the uploaded file to rename
  * @return String
  */
  this.getUniqueFileName = function(file) {
    var fileExt = (file).split('.').pop();
    var fileName = (file).split('.').shift();
    var cleanedFile = (fileName).replace(/ /gi,'_');
    var newName = cleanedFile+'_'+Date.now()+'.'+fileExt;
    return newName;
  }
  /**
  * Allows to create new bucket for user in the aws cloud
  */
  this.createBucket = function(params) {
    s3.createBucket(params, function(err, data) {
      if (err) {
        console.log(er);
      } else {
          console.log(data);
      }
    });
  }
  /**
  * Allow s to delete bucket
  * @param name : parameters of bucket to delete in the cloud
  */
  this.deleteBucket = function(params) {
    s3.deleteBucket(params, function(err, data) {
      if (err) {
        console.log(err); // an error occurred
      }
      else {
         console.log("Bucket deleted successfully...");
         console.log(data); // successful response
      }
    });
  }
  /**
  * Allows to create new directory on specifical bucket on aws
  */
  this.sendObject = function(params) {
    s3.putObject(params, function(err, data) { //upload file in the cloud
        if (err) {
          console.log(err)
        } else {
          console.log("Folder created successfully...");
          console.log(data);
        }
    });
  }
  /**
  * Allows to delete many object in the cloud
  * @param params : parameters of objects to delete
  */
  this.deleteObjects = function(params) {
    s3.deleteObjects(params, function(err, data) {
        if (err) {
          console.log(err); //an error occurred
        } else {
          console.log("Objects deleted successfully...");
           console.log(data); //successful response
        }
    });
  }
}

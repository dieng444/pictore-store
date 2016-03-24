var AWS = require('aws-sdk')
  , fs = require('fs')
  , MooseError = require('../utils/error')
  , util = require('../utils/util');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents an Amazon Web Service(aws) BucketManager
* @class
* @property {AWS.S3} s3 - the aws s3 web service
*/
function BucketManager() {

  /***aws s3 object variable***/
  var s3 = new AWS.S3();

  /**
  * @method
  * Allows to find all object list on current bucket
  * @param {Object} params - the parameter to use for the current request
  * @param {Function} callback - the callback function to call after treatment
  */
  this.findAllObjects = function(params, callback) {
    if(!params)
      throw MooseError.getInstance(new TypeError(util.getParamErr('findAllObjects','params')));
    if(util.isCallbackMissed(callback))
        throw MooseError.getInstance(new TypeError(util.getParamErr('findAllObjects','callback')));
    s3.listObjects(params,function(err, data) {
      if (err) console.log("Error:", err);
      else {
        callback(err,data);
      }
    });
  }

  /**
  * @method
  * Allows to send file object to aws
  * @param {string} fileName - the file name to delete after sending done
  * @param {Object} params - the parameter to use for the current request
  * @param {Function} callback - the callback function to call after treatment
  */
  this.sendFileObject = function(fileName, params, callback) {
    if(!fileName)
      throw MooseError.getInstance(new TypeError(util.getParamErr('sendFileObject','fileName')));
    if(!params)
      throw MooseError.getInstance(new TypeError(util.getParamErr('sendFileObject','params')));
    if(util.isCallbackMissed(callback))
      throw MooseError.getInstance(new TypeError(util.getParamErr('sendFileObject','callback')));
    fs.readFile(fileName, function (err, res) {
      if (err) console.log(err);
      params.Body = res; /***handle readFile data to params Body*/
      s3.putObject(params, function(err, res) {
          if (err) console.log(err)
          else {
            fs.unlink(fileName, function(errs) { /***Delete file on server disk*/
              if (errs) console.error(errs);
              else callback(errs,res);
            });
          }
        });
    });
  }
  /**
  * @method
  * Allows to create new bucket for user in the aws cloud
  * @param {Object} params - the parameter to use for the current request
  * @param {Function} callback - the callback function to call after treatment
  */
  this.createBucket = function(params, callback) {
    if(!params)
      throw MooseError.getInstance(new TypeError(util.getParamErr('createBucket','params')));
    if(util.isCallbackMissed(callback))
      throw MooseError.getInstance(new TypeError(util.getParamErr('createBucket','callback')));
    s3.createBucket(params, function(err, res) {
      if (err) console.log(err);
      else callback(err,res);
    });
  }

  /**
  * @method
  * Allow s to delete bucket
  * @param {string} params - parameter of bucket to delete in the cloud
  * @param {Function} callback - the callback function to call after treatment
  */
  this.deleteBucket = function(params, callback) {
    if(!params)
      throw MooseError.getInstance(new TypeError(util.getParamErr('deleteBucket','params')));
    if(util.isCallbackMissed(callback))
      throw MooseError.getInstance(new TypeError(util.getParamErr('deleteBucket','callback')));
    s3.deleteBucket(params, function(err, data) {
      if (err) console.log(err);
      else callback(err,res);
    });
  }
  /**
  * @method
  * Allows to create new directory on specifical bucket
  * @param {Object} params - the parameter to use for the current request
  * @param {Function} callback - the callback function to call after treatment
  */
  this.sendObject = function(params, callback) {
    if(!params)
      throw MooseError.getInstance(new TypeError(util.getParamErr('sendObject','params')));
    if(util.isCallbackMissed(callback))
      throw MooseError.getInstance(new TypeError(util.getParamErr('sendObject','callback')));
    s3.putObject(params, function(err, res) { /***upload file in the cloud*/
        if (err) console.log(err)
        else callback(err,res);
    });
  }
  /**
  * @method
  * Allows to delete many object in the cloud
  * @param {Object} params - the parameter to use for the current request
  * @param {Function} callback - the callback function to call after treatment
  */
  this.deleteObject = function(params, callback) {
    if(!params)
      throw MooseError.getInstance(new TypeError(util.getParamErr('deleteObjects','params')));
    if(util.isCallbackMissed(callback))
      throw MooseError.getInstance(new TypeError(util.getParamErr('deleteObjects','callback')));
    s3.deleteObject(params, function(err, res) {
        if(err) console.log(err);
        else callback(err,res);
    });
  }
}
module.exports = BucketManager;

var MooseError = require('./error');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents an Amazon Web Service(aws) BucketManager
* @class
* @property {AWS.S3} s3 - the aws s3 web service
*/
var Util = {

  /**
  * @method
  * Allows to chek if object is empty or not
  * @param {Object} obj - object to check for
  * @return {booelan}
  */
  isEmpty : function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) return false;
      }
    return true && JSON.stringify(obj) === JSON.stringify({});
  },

  /**
  * @method
  * Returns message for missed parameter error
  * @param {string} func - the current function name
  * @param msg {string} message - message to display in the error
  * @return {string}
  */
  getParamErr : function(func,param) {
    return 'Method '+func+' called without the '+param+' parameter';
  },

  /**
  * @method
  * Allows to check if callback is specified in current function
  * @param {string} callback - the callback to check for
  * @return {boolean}
  */
  isCallbackMissed : function(callback) {
    if (!callback || typeof callback !=='function') return true;
    else return false;
  },
  
  /**
  * @method
  * Allows to build an unique file name
  * @param {string} file - the uploaded file to rename
  * @return {string}
  */
  getUniqueFileName : function(file) {
    if(!file)
      MooseError.getInstance(new TypeError(Util.getParamErr('getUniqueFileName','file')));
    var fileExt = (file).split('.').pop()
        , fileName = (file).split('.').shift()
        , cleanedFile = (fileName).replace(/ /gi,'_')
        , newName = cleanedFile+'_'+Date.now()+'.'+fileExt;
    return newName;
  }
}

module.exports = Util;

/**************************************************
* Object Album, represents an Album                  *
***************************************************/
var MainEntity = require('./MainEntity');
var util = require('util');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a Album
* @class
* @param {Object} data - the data object with which to initialize the class attributes
* @property {string} name - the bucket name
* @property {Bucket} bucket - bucket of the album
* @property {string} visibility - allows to know if the album will be visible
*/
function Album(data) {

  /***The album name**/
  var name;

  /***The album container bucket***/
  var bucket;

  /***Album visibility***/
  var visibility;

  /**
  * Allows to modify the album name
  * @method
  * @param {string} _name - the new name to assign
  */
  this.setName = function(_name) {
    name = _name
  }

  /**
  * Return the album name
  * @method
  * @return {string}
  */
  this.getName = function() {
    return name;
  }

  /**
  * Allows to modify the album current bucket
  * @method
  * @param {Bucket} _bucket - the new bucket to assign
  */
  this.setBucket = function(_bucket) {
    bucket = _bucket
  }

  /**
  * Return album bucket
  * @method
  * @return {Bucket}
  */
  this.getBucket = function() {
    return bucket;
  }

  /**
  * Allows to modify the album visibility
  * @method
  * @param {boolean} _visibility - the new visibility to assign
  */
  this.setVisibility = function(_visibility) {
    visibility = _visibility;
  }

  /**
  * Return the album visibility value
  * @method
  * @return {boolean}
  */
  this.getVisibility = function() {
    return visibility;
  }

  /***Inheritance of the super entity class*/
  MainEntity.call(this,data);
}
util.inherits(Album,MainEntity);
module.exports = Album;

/**************************************************
* Object Album, represents an Album                  *
***************************************************/
var MainEntity = require('../../../lib/main/main-entity');
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
* @property {string} location - the album pictures location
* @property {Date} createdDate - the album created date
* @property {Bucket} bucket - bucket of the album
*/
function Album(data) {

  /**Private var - the user identify*/
  var id = null;

  /***The album name**/
  var name;

  /***The originalName of the album**/
  var originalName;

  /***Album location***/
  var location;

  /***Album created date***/
  var createdDate;

  /***The album container bucket***/
  var bucket;


  /**
  * @method
  * Allows to set album id
  * @param {int} id - the new id to assign
  */
  this.setId = function(_id) {
      id = _id;
  }

  /**
  * @method
  * Return current album id
  * @return {int}
  */
  this.getId = function() {
    return id;
  }

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
  * Allows to modify the album original name
  * @method
  * @param {string} _name - the new name to assign
  */
  this.setOriginalName = function(_oname) {
    originalName = _oname
  }

  /**
  * Return the album original name
  * @method
  * @return {string}
  */
  this.getOriginalName = function() {
    return originalName;
  }

  /**
  * Allows to modify the album location
  * @method
  * @param {string} loc - the album location
  */
  this.setLocation = function(loc) {
    location = loc;
  }

  /**
  * Return the album location
  * @method
  * @return {string}
  */
  this.getLocation = function() {
    return location;
  }

  /**
  * Allows to set the album created date
  * @method
  * @param {Date} _createdDate - the new date to assign
  */
  this.setCreatedDate = function(_createdDate) {
    createdDate = _createdDate
  }

  /**
  * Returns the album created date
  * @method
  * @return {Date}
  */
  this.getCreatedDate = function(_createdDate) {
    return createdDate;
  }

  /**
  * Allows to modify the album current bucket
  * @method
  * @param {Bucket} _bucket - the new bucket to assign
  */
  this.setBucket = function(_bucket) {
    bucket = _bucket;
  }

  /**
  * Returns album bucket
  * @method
  * @return {Bucket}
  */
  this.getBucket = function() {
    return bucket;
  }

  /***Inheritance of the super entity class*/
  MainEntity.call(this,data);
}
util.inherits(Album,MainEntity);
module.exports = Album;

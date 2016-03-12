/**************************************************
* Class Bucket, represents a Bucket               *
***************************************************/
var MainEntity = require('./MainEntity');
var util = require('util');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a Bucket
* @class
* @param {Object} data - the data object with which to initialize the class attributes
* @property {string} name - the bucket name
* @property {string} owner - the bucket owner
*/
function Bucket(data) {

  /***Private var, the bucket name*/
  var name;

  /***Private var, the bucket owner*/
  var owner;

  /**
  * Allows to modify the bucket name
  * @method
  * @param {string} _name - the new name to assign
  */
  this.setName = function(_name) {
    name = _name
  }

  /**
  * Return bucket name
  * @method
  * @return {string}
  */
  this.getName = function() {
    return name;
  }

  /**
  * Allows to modify the bucket owner
  * @method
  * @param {string} owner - the new owner to assign
  */
  this.setOwner = function(owner) {
    owner = _owner;
  }

  /**
  * Return the bucket owner
  * @method
  * @return {string}
  */
  this.getOwner = function() {
    return owner;
  }

  /***Inheritance of the super entity class*/
  MainEntity.call(this,data);
}
util.inherits(Bucket,MainEntity);
module.exports = Bucket;

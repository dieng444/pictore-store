/**************************************************
* Object image, represents an image                  *
***************************************************/
var MainEntity = require('../../../lib/main/main-entity');
var util = require('util');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents an Image
* @class
* @param {Object} data - the data object with which to initialize the class attributes
* @property {string} name - the image name
* @property {album} album - album of the image
* @property {string} visibility - allows to know if the image will be visible
*/
function Image(data) {

  /***The image identify*/
  var id = null;

  /***The image name**/
  var name;

  /***The image container album***/
  var album;

  /***the iamage visibility***/
  var visibility;

  /**
  * @method
  * Allows to set image id
  * @param {int} id - the new id to assign
  */
  this.setId = function(_id) {
      id = _id;
  }

  /**
  * @method
  * Returns current image id
  * @return {int}
  */
  this.getId = function() {
    return id;
  }

  /**
  * Allows to modify the image name
  * @method
  * @param {string} _name - the new name to assign
  */
  this.setName = function(_name) {
    name = _name
  }

  /**
  * Return the image name
  * @method
  * @return {string}
  */
  this.getName = function() {
    return name;
  }

  /**
  * Allows to modify the image current album
  * @method
  * @param {album} _album - the new album to assign
  */
  this.setAlbum = function(_album) {
    album = _album
  }

  /**
  * Return image album
  * @method
  * @return {album}
  */
  this.getAlbum = function() {
    return album;
  }

  /**
  * Allows to modify the image visibility
  * @method
  * @param {boolean} _visibility - the new visibility to assign
  */
  this.setVisibility = function(_visibility) {
    visibility = _visibility;
  }

  /**
  * Return the image visibility value
  * @method
  * @return {boolean}
  */
  this.getVisibility = function() {
    return visibility;
  }

  /***Inheritance of the super entity class*/
  MainEntity.call(this,data);
}
util.inherits(Image,MainEntity);
module.exports = Image;

/***************************************************************************
* Class MainEntity - an nodejs module representing super class of entities *
****************************************************************************/

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a MainEntity
* @constructor
* @param {Object} data - the data object with which to initialize
* the class attributes
*/
function MainEntity(data) {
  this.init = function() {
    for(attr in data) {
      var method = 'set'+attr.charAt(0).toUpperCase() + attr.slice(1);
      for(key in this) {
        if (key == method && typeof this[key] === 'function') {
          this[key](data[attr]); /***Calling the setter here after parse**/
        }
      }
    }
  }
  /****Do not touch the following method position***/
  this.init();
}
/***Exporting the module**/
module.exports = MainEntity;

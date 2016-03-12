var util = require('util');
var Image = require('../entities/Image');
var MainModel = require('../../../lib/main/main-model');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a ImageModel
* @class
* @property {string} collection - the collection to use for the model
*/
function ImageModel() {

  /***The collection to use for this model**/
  var collection = 'images';

  /***Calling the super manager constructor***/
  MainManager.call(this, collection, Image);
}
/*******************
* Bind your manager to the super manager here by completing the first parameter
*******************/
util.inherits(ImageModel,MainModel);

module.exports = ImageModel;

var util = require('util');
var Album = require('../entities/Album');
var MainModel = require('../../../lib/main/main-model');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a AlbumModel
* @class
* @property {string} collection - the collection to use for the model
*/
function AlbumModel() {

  /***The collection to use for this model**/
  var collection = 'albums';

  /***Calling the super manager constructor***/
  MainModel.call(this, collection, Album);
}
/*******************
* Bind your manager to the super manager here by completing the first parameter
*******************/
util.inherits(AlbumModel,MainModel);

module.exports = AlbumModel;

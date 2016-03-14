var util = require('util');
var Bucket = require('../entities/Bucket');
var MainModel = require('../../../lib/main/main-model');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a BucketModel
* @class
* @property {string} collection - the collection to use for the model
*/
function BucketModel() {

  /***The collection to use for this model**/
  var collection = 'buckets';

  /***Calling the super manager constructor***/
  MainModel.call(this, collection, Bucket);
}
/*******************
* Bind your manager to the super manager here by completing the first parameter
*******************/
util.inherits(BucketModel,MainModel);

module.exports = BucketModel;

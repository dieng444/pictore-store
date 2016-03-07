/**************************************************
* An Node.js module for MongoDB entities manager  *
***************************************************/

/**************************************************
*                   Dependencies                  *
***************************************************/
var NodeMongodbManager = require('../../node-mongodb-manager/nmm');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a manager
* @constructor
*/
module.exports = function() {

  /**
  * The database instance variable
  */
  var db = new NodeMongodbManager().getDB();

  /**
  * list of ojects to save
  */
  var listObject = new Array();

  /**
  * Allows to retrive a single object in collection from database
  * @param {object} id - the unique identify of object to retrive
  */
  this.find = function(id) {
    console.log('find method ok! '+' '+'id = '+id);
  }

  /**
  * Allows to retrive all entries of given collection
  **/
  this.findAll = function() {
    console.log('findAll method ok!');
  }

  /**
  * Allows to retrieve many objects in collection by criteria
  * @param {Object}  criteria - the criteria to use for the request
  */
  this.findBy = function(criteria) {
    console.log('findBy method ok!'+' '+'filter = '+filter);
  }

  /**
  * Allows to retrive one object in collection by criteria
  * @param {Object}  criteria - the criteria to use for the request
  */
  this.findOneBy = function(criteria) {

  }

  /**
  * Allows to parse all gieven objects and prepare them for insertion
  * in database
  * @param {function} callback - function to call when everything went well
  */
  this.oParser = function(callback) {
    var oTab = new Array();
    var err = null;
    for(i in listObject) {
      var data = {};
      var object = listObject[i]; //Current object in the loop (can be any type of object)
      var attribut = null;
      var getter = null;
      for(attr in object) {
        if(/set/.test(attr)) {
          attribut = attr.substring(3,attr.length); //Will return "FirstName" for "setFirstName"
          attribut = attribut.charAt(0).toLowerCase() + attribut.slice(1); //Will return "firstName" for "FirstName"
          getter = 'get'+attribut.charAt(0).toUpperCase() + attribut.slice(1); //Will return "getFirstName" for firstName
          //The following line equals to data['firstName'] = user.getFirstName() for user object iterating in the loop
          data[attribut] = object[getter]();
        }
      }
      oTab.push({c:object.getCollection(),d:data}); //Storing current object data and his collection
    }
    if(callback) {//When everything went well, callback is called for accessing the data
      callback(err,oTab);
    } else {
      console.log('Missed callback has parameter in the oParser function call');
    }
  }

  /**
  * Allows to save all objects persisted
  */
  this.save = function() {
    this.oParser(function(err,oData) {
      if(err) {
        console.log(err);
        return;
      }
      for(i in oData) {
        db.collection(oData[i].c).insertOne(oData[i].d, function(err, result) {
          if (err) {
            console.error(err);
          }
          console.log(result);
        });
      }
    });
    listObject = []; //Clearning the objects list after current saving done
  }

  /**
  * Allows to remove persisted objects
  */
  this.remove = function() {
    listObject = []; //Clearning the objects list after current save done
  }

  /**
  * Allows to retrieve many object by custome query
  * @param {Object} - the query to execute for the custome request
  */
  this.findByCustomeQuery = function(query) {

  }
  /**
  * Allows to persist given objects
  * @param {Object} - the object to persist
  */
  this.persist = function(object) {
    listObject.push(object);
  }
}

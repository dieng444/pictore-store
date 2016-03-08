/**************************************************
* An Node.js module for MongoDB entities manager  *
***************************************************/

/**************************************************
*                   Dependencies                  *
***************************************************/
var NodeMongodbManager = require('../../node-mongodb-manager/nmm');
var ObjectID = require('mongodb').ObjectID;
var User = require('../entities/User');
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

  var collection = 'users';
  var idKey = '_id';
  var filter = {};
  var err = null;
  /**
  * Allows to retrive a single object in collection from database
  * @param {object} id - the unique identify of object to retrive
  */
  this.find = function(id,callback) {
    filter[idKey] = new ObjectID(id);
    db.collection(collection).findOne(filter,{}, function(err, doc) {
      if(err) {
        console.log(err);
      }
      if (callback) {
        doc.id = doc._id; //removing the "_" from the id
        delete doc._id; //And we can now delete the _id generate by mongodb
        var user = new User(doc);
        callback(err,user);
      }
    });
    filter = []; //Clearning the filter object
  }
  /**
  * Allows to retrive all entries of given collection
  **/
  this.findAll = function(callback) {
    db.collection(collection).find(filter).toArray(function(err, docs) {
      if(err) {
        console.log(err);
      }
      if (callback) {
        var objects = new Array();
        for(i in docs) {
          objects.push(new User(docs[i]));
        }
        callback(err,objects);
      }
    });
  }
  /**
  * Allows to retrieve many objects in collection by criteria
  * @param {Object}  criteria - the criteria to use for the request
  */
  this.findBy = function(criteria, callback) {
    db.collection(collection).find(criteria).toArray(function(err, docs) {
      if(err) {
        console.log(err);
      }
      if (callback) {
        var objects = new Array();
        for(i in docs) {
          objects.push(new User(docs[i]));
        }
        callback(err,objects);
      }
    });
  }
  /**
  * Allows to retrive one object in collection by criteria
  * @param {Object}  criteria - the criteria to use for the request
  */
  this.findOneBy = function(criteria,callback) {
    db.collection(collection).findOne(criteria,{}, function(err, doc) {
      if(err) {
        console.log(err);
      }
      if (callback) {
        var user = new User(doc);
        callback(err,user);
      }
    });
  }
  /**
  * Allows to parse all gieven objects and prepare them for insertion
  * in database
  * @param {function} callback - function to call when everything went well
  */
  this.oParser = function(callback) {
    var oTab = new Array();
    for(i in listObject) {
      var data = {};
      var object = listObject[i]; //Current object in the loop (can be any type of object)
      var attribut = null;
      var getter = null;
      var objectId = null;
      for(attr in object) {
        if(/set/.test(attr)) {
          attribut = attr.substring(3,attr.length); //Will return "FirstName" for "setFirstName"
          attribut = attribut.charAt(0).toLowerCase() + attribut.slice(1); //Will return "firstName" for "FirstName"
          getter = 'get'+attribut.charAt(0).toUpperCase() + attribut.slice(1); //Will return "getFirstName" for firstName
          if (getter!='getId') { //Object id is null here so o.getId() will return null
            //The following line equals to data['firstName'] = user.getFirstName() for user object iterating in the loop
            data[attribut] = object[getter]();
          } else {
            objectId = object[getter](); //Storing separatly the object id for saving mode
          }
        }
      }
      oTab.push({id: objectId, d: data}); //Storing current object in the loop
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
        if(oData[i].id!==null) { //Update mode, object id is not null (objec already exists)
          filter[idKey] = new ObjectID(oData[i].id);
          db.collection(collection).updateOne(filter,{$set:oData[i].d},function(err, result) {
            if (err) {
              console.error(err);
            }
            console.log(result);
          });
        } else { //insert mode, object id is null (new object)
          db.collection(collection).insertOne(oData[i].d, function(err, result) {
            if (err) {
              console.error(err);
            }
            console.log(result);
          });
        }
      }
    });
    listObject = []; //Clearning the objects list after current saving done
  }
  /**
  * Allows to remove persisted objects
  */
  this.remove = function(o, callback) {
    filter[idKey] = new ObjectID(o.getId());
    db.collection(collection).removeOne(filter, {w:1}, function(err, res) {
      if(err) {
        console.log(err);
      }
      if(callback) {
        callback(err,res);
      }
    });
  }
  /**
  * Allows to retrieve many object by custome filter
  * @param {Object} - the filter to execute for the custome request
  */
  this.findByCustomefilter = function(filter, callback) {

  }
  /**
  * Allows to persist given objects
  * @param {Object} - the object to persist
  */
  this.persist = function(object) {
    listObject.push(object);
  }
  /**
  * Allows to persist given objects
  * @param {Object} - the object to persist
  */
  this.unpersist = function(object) {
    listObject.splice(object,1);
  }
}

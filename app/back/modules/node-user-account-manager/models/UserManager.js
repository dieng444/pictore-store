/**************************************************
*                   Dependencies                  *
***************************************************/
var NodeMongodbManager = require('../../node-mongodb-manager/nmm');

module.exports = function() {

  var db = new NodeMongodbManager().getDB();
  console.log(db.s.databaseName+' '+'from manager');
  this.find = function(id) {
    console.log('find method ok! '+' '+'id = '+id);
  }
  this.findAll = function() {
    console.log('findAll method ok!');
  }
  this.findBy = function(filter) {
    console.log('findBy method ok!'+' '+'filter = '+filter);
  }
  this.findOneBy = function(filter) {

  }
  this.save = function(user) {
    var attr = Object.keys(user);
    console.log(attr);
  }
  this.remove = function() {

  }
  this.findByCustomeQuery = function(query) {

  }
  /*this.setCollection = function(collection) {
    this.collection = collection;
  }
  this.getCollection = function(collection) {
    this.collection = collection;
  }*/
}

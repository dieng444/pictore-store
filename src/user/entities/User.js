/**************************************************
* Object User, represents a User                  *
***************************************************/

/**************************************************
*                   Dependencies                  *
***************************************************/
var MainEntity = require('./MainEntity');
var util = require('util');

/**
* @author Macky Dieng
* @license MIT - http://opensource.org/licenses/MIT
* @copyright 2016 the author
*
* Represents a User
* @constructor
* @param {Object} data - the data object with which to initialize
* the class attributes
*/
function User(data) {

    /**Private var - the user identify*/
    var id = null;

    /**Private var - the user firstName*/
    var firstName;

    /**Private var - the user lastName*/
    var lastName;

    /**Private var - the user description*/
    var description;

    /**Private var - the email*/
    var email;

    /**Private var - the user password*/
    var password;

    /**
    * Allows to set user id
    * @param {int} id - the new id to assign
    */
    this.setId = function(_id) {
        id = _id;
    }

    /**
    * Return current user id
    * @return {int}
    */
    this.getId = function() {
      return id;
    }

    /**
    * Allows to set user firstName
    * @param {string} fname - new firstName to assign
    */
    this.setFirstName = function(fname) {
      firstName = fname;
    }

    /**
    * Return the current user firstName
    * @return {string}
    */
    this.getFirstName = function() {
      return firstName;
    }

    /**
    * Allows to set user lastName
    * @param {lname} - the new lastName to assign
    */
    this.setLastName = function(lname) {
      lastName = lname;
    }

    /**
    * Return the current user lastName
    * @return {string}
    */
    this.getLastName = function() {
      return lastName;
    }

    /**
    * Allows to set the user email
    * @param {string} email - the new email to assign
    */
    this.setEmail = function(mail) {
      email = mail;
    }

    /**
    * Return the current user email
    * @return {string}
    */
    this.getEmail = function() {
      return email;
    }

    /**
    * Allows to set the user password
    * @param {string} pwd - the new password to assign
    */
    this.setPassword = function(pwd) {
      password = pwd;
    }

    /**
    * Return the current user password
    * @return {string}
    */
    this.getPassword = function() {
      return password;
    }

    /***
    * Inheritance of the super entity class
    */
    MainEntity.call(this,data);
}
/*******************
* Bind your Entity to the super Entity here, by completing the first parameter
*******************/
util.inherits(User,MainEntity);

module.exports = User;

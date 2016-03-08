
module.exports = function(data) {

    var id = null;

    var firstName;

    var lastName;

    var description;

    var email;

    var password;

    //var collection = "users";

    this.init = function() {
      for(attr in data) {
        var method = 'set'+attr.charAt(0).toUpperCase() + attr.slice(1);
        for(key in this) {
          if (key == method && typeof this[key] === 'function') {
            this[key](data[attr]);
          }
        }
      }
    }
    this.setId = function(_id) {
        id = _id;
    }
    this.getId = function() {
      return id;
    }
    this.setFirstName = function(fname) {
      firstName = fname;
    }
    this.getFirstName = function() {
      return firstName;
    }
    this.setLastName = function(lname) {
      lastName = lname;
    }
    this.getLastName = function() {
      return lastName;
    }
    this.setEmail = function(mail) {
      email = mail;
    }
    this.getEmail = function() {
      return email;
    }
    this.setPassword = function(pwd) {
      password = pwd;
    }
    this.getPassword = function() {
      return password;
    }
    /*this.getCollection = function() {
      return collection;
    }*/
    /**
    * Is importante to call the init method at the end of the class
    * That means all the class attributs and function are been attached to her
    ***/
    this.init();
}

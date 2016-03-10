
var Util = {
  /**
  * Allows to chek if object is empty or not
  * @param {Object} obj - object to check
  */
  isEmpty : function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
          return false;
        }
    }
    return true && JSON.stringify(obj) === JSON.stringify({});
  },
  /**
  * Private method, allows to display errors
  * @param {string} func - the current function name
  * @param msg {string} message - message to display in the error
  */
  getParamErr : function(func,param) {
    return 'Method '+func+' called without the '+param+' parameter';
  },
  /**
  * Private helper method, allows to check if callback is specified in current function
  * @param {string} callback - the callback to check for
  */
  isCallbackMissed : function(callback) {
    if (!callback || typeof callback !=='function') {
        return true;
    } else {
        return false;
    }
  }
}

module.exports = Util;

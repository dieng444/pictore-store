
function MyError(message) {
  this.name = 'MyError';
  this.message = message;
  Error.captureStackTrace(this, MyError);
}

MyError.getInstance = function(params) {
  var error = null;
  if(params instanceof Error) {
    error = new MyError(params.message);
    error.stack = params.stack;
  } else if (typeof params =='string') {
    error = new MyError(params);
  } else {
    throw new Error("Unknow type of error");
  }
  return error;
}

MyError.prototype = new Error;
module.exports = MyError;

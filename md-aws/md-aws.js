/**
* Module Macky Dieng - amazon Web Service
*/
module.exports = function (s3) {
  var data = null;
  assignValue = function(value) {
    data = value;
    console.log(data);
  }
  /**
  * Allows to find all object list on an aws bucket
  * @param params the parameters for aws
  */
  this.findAllObjects = function(params) {
    s3.listObjects(params,function(err, data) {
      if (err) { console.log("Error:", err); }
      else {
        assignValue(data.Contents);
      }
    });
  }
  /**
  * Allow to send object to the aws
  */
  this.sendObject = function(fs, fileName , s3, params) {
      fs.readFile(fileName, function (err, data) {
        if (err) { throw err; }
        params.Body = data; //handle readFile data to params Body
        console.log(params);
        s3.putObject(params, function(err, data) { //upload file in the cloud
            if (err) {
              console.log(err)
            } else {
              fs.unlink(fileName, function(err) { //Delete file on server disk
                if (err)
                    console.error(err);
                else
                  console.log("Files uploaded successfully...");
              });
            }
          });
      });
  }
  /**
  * Allows to have uniq file name
  * @param file : the uploaded file to rename
  */
  this.getUniqFileName = function(file) {
    var fileExt = (file).split('.').pop();
    var fileName = (file).split('.').shift();
    var cleanedFile = (fileName).replace(/ /gi,'_');
    var newName = cleanedFile+'_'+Date.now()+'.'+fileExt;
    return newName;
  }
}

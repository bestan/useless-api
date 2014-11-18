var debug = require('debug')('fol');
var mongo = require('./mongo');
var app = require('./express').init();

var db = new mongo.Mongo('localhost', 27017);

mongo.init(app, db);
require('./math').init(app);
require('./pointless').init(app);
require('./othershit').init(app);



// This needs to go last -> to catch all uncaught calls
mongo.idiot(app,db);

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  debug('Example app listening at http://%s:%s', host, port)
});

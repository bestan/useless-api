var debug = require('debug')('fol');
var app = require('./express').init();
require('./math').init(app);
require('./pointless').init(app);
require('./othershit').init(app);

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  debug('Example app listening at http://%s:%s', host, port)
});

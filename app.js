var debug = require('debug')('fol');
var app = require('./express').init();
require('./tariq').init(app);
require('./nicola').init(app);
require('./othershit').init(app);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  debug('Example app listening at http://%s:%s', host, port)

});

var express = require('express');
var bodyParser = require('body-parser');

module.exports.init = function(){
  var app = express();

  // TODO app config
  app.use(bodyParser.json());

  // TODO Templating

  app.set('views', __dirname + '/view');
  app.set('view engine', 'jade');

  return app;
};

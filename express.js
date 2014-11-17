var express = require('express');
module.exports.init = function(){
  var app = express();

  // TODO app config
  // TODO Templating

  app.set('views', __dirname + '/view');
  app.set('view engine', 'jade');

  return app;
};

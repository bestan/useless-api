var debug = require('debug')('othershit');

module.exports.init = function(app){
  app.get('/', function (req, res) {
    res.send('Hello World!')
  });

  app.post('/echo', function(req,res){
    res.status(200).send(req.body);
  });
};

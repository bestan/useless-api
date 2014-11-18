var debug = require('debug')('othershit');

module.exports.init = function(app){
  app.get('/', function (req, res) {
    res.send('Hello World!')
  });

  app.post('/echo', function(req,res){
    res.status(200).send(req.body);
  });

  app.get('/yo', function(req, res){
    if (req.query.name !== undefined){
      return res.status(200).send('Yo, ' + req.query.name + '!');
    }
    return res.status(200).send('Yo');
  });
};

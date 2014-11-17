var debug = require('debug')('tariq');
module.exports.init = function(app){
  app.get('/tariq', function (req, res) {
    res.send('lol!')
  });

  app.post('/echo', function(req,res){
    res.status(200).send(req.body);
  });

  var calculate = function(req, res, calculator){
    if (req.body.x === undefined || req.body.y === undefined){
      return res.sendStatus(400);
    }

    var x = parseFloat(req.body.x,10);
    if (isNaN(x)){
      return res.sendStatus(400);
    }

    var y = parseFloat(req.body.y,10);
    if (isNaN(y)){
      return res.sendStatus(400);
    }

    var resp = calculator(x, y);
    if (isNaN(resp)){
      return res.sendStatus(400);
    }

    if (resp === 3){
      res.status(200).send('Half-Life 3 confirmed.');
    } else {
      res.status(200).send(''+resp);
    }
  };

  app.post('/add', function(req,res){
    calculate(req, res, function(x, y){
      return x + y;
    });
  });

  app.post('/subtract', function(req,res){
    calculate(req, res, function(x, y){
      return x - y;
    });
  });

  app.post('/multiply', function(req,res){
    calculate(req, res, function(x, y){
      return x * y;
    });
  });

  app.post('/divide', function(req,res){
    calculate(req, res, function(x, y){
      return x / y;
    });
  });


};

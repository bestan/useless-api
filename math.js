var debug = require('debug')('math');

var add = function(x,y){
  return x + y;
}

var subtract = function(x,y){
  return x - y;
}

var multiply = function(x,y){
  return x * y;
}

var divide = function(x,y){
  return x / y;
}

var mod = function(x,y){
  return x % y;
}

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

module.exports.init = function(app){

  app.post('/add', function(req,res){
    calculate(req, res, add);
  });

  app.post('/subtract', function(req,res){
    calculate(req, res, subtract);
  });

  app.post('/multiply', function(req,res){
    calculate(req, res, multiply);
  });

  app.post('/divide', function(req,res){
    calculate(req, res, divide);
  });

  app.post('/mod', function(req,res){
    calculate(req, res, mod);
  });
}

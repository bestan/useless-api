var debug = require('debug')('mongo');
var error = require('debug')('err');

var mongo = require('mongodb');
var Db = mongo.Db;
var Server = mongo.Server;

var logger = function(req, res, next){
  debug("i is da man in da middle bro");

  var toSave = {};
  toSave.headers = req.headers;
  toSave.body = req.body;
  toSave.url = req.url;
  toSave.baseUrl = req.baseUrl;
  toSave.method = req.method;
  toSave.originalUrl = req.originalUrl;
  toSave._parseUrl = req._parsedUrl;
  toSave.params = req.params;
  toSave.query = req.query;
  this.insertRequest(toSave, function(err, result){
    if (err === undefined){
      req._didSave = false;
    } else {
      req._didSave = true;
      req._id = result;
    }
    next(); // Passing the request to the next handler in the stack.
  });
}

module.exports.init = function(app, mongo){
  app.use(logger.bind(mongo));
}

module.exports.idiot = function(app, mongo){
  app.all('*', function(req,res){
    mongo.requests.update({_id:req._id}, { $set: {_idiot:true}}, function(err, result){
      error(err);
      debug(result);
    });

  //  mongo.requests.find({_id:req._id}).toArray(function(err, docs) {
    //assert.equal(err, null);
    ///assert.equal(1, docs.length);
    //  console.log("Found the following records");
    //  docs.forEach(function(element, index, array){
    //      console.log(element);
    //  });
  //  });

    debug('IDIOT');
    res.sendStatus(404);
  });
}


function Mongo(host, port, callback){
  // Set up the connection to the local db
  var db = new Db('useless', new Server(host, port), {safe:true});

  db.open(function(err, db){
    if (err){
      return callback(err);
    }
    this.requests = db.collection('requests');
  }.bind(this));
}

Mongo.prototype.insertRequest = function(req, callback){
  this.requests.insert(req, {w:1}, function(err, result){
    if (callback !== undefined){
      if (result !== undefined && result.length > 0){
        callback(err, result[0]._id);
      } else {
        callback(err, undefined);
      }
    }
  })
}

module.exports.Mongo = Mongo;

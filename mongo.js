var debug = require('debug')('mongo');
var mongo = require('mongodb');
var Db = mongo.Db;
var Server = mongo.Server;

var logger = function(req, res, next){
  debug("i is da man in da middle bro");
  this.insertRequest(req)
  next(); // Passing the request to the next handler in the stack.
}

module.exports.init = function(app, mongo){
  app.use(logger.bind(mongo));
}

module.exports.idiot = function(app, mongo){
  app.all('*', function(req,res){
    //console.log(mongo)
//    console.log(mongo.requests)

debug(req._id);
    var one = mongo.requests.findOne({_id:req._id});
    console.log(one);
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

  /*return {
    requests:this.requests,
    close: function(){
      db.close();
    }.bind(this),
    insertRequest:function(req, callback){
      this.requests.insert(req, {w:1}, function(err, result){
        if (callback !== undefined){
          callback(err, result);
        }
      }.bind(this))
    }.bind(this)
  }
  */
}

Mongo.prototype.insertRequest = function(req, callback){
  this.requests.insert(req, {w:1}, function(err, result){
    if (callback !== undefined){
      callback(err, result);
    }
  }.bind(this))
}

/*Mongo.prototype.logger = function(req, res, next){
  debug("i is da man in da middle bro");
  this.insertRequest(req)
  next(); // Passing the request to the next handler in the stack.
}
*/
module.exports.Mongo = Mongo;

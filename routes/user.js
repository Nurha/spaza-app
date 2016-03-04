var bcrypt = require('bcrypt');

exports.showUser = function(req, res, next){
  req.getConnection(function(err, connection){
    if(err) return next(err);
    connection.query('SELECT * FROM User', [], function(err, result){
      if(err) throw err;
      res.render('User',{
        user : result
      });
    });
  });
};

exports.addUser = function(req, res, next){
  req.getConnection(function(err,connection){
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      user_name : input.user_name,
      user_password : input.user_password,
      description : "customer"
    };
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(input.user_password, salt, function(err, hash) {
              // Store hash in your password DB.

              // console.log("hash details...")
              // console.log(hash)
              // console.log(hash.length)

              data.user_password = hash;
        connection.query('insert into User set ?', [data], function(err, results) {
  			if (err) return next(err);
			  res.redirect('/');
		    });
      });
    });
  });
};

exports.addUserAdmin = function(req, res, next){
  req.getConnection(function(err, connection){
    var data = {
        user_name : req.body.user_name,
        user_password : req.body.user_password,
        description : "admin"
    };
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.user_password, salt, function(err, hash) {
              // Store hash in your password DB.

              // console.log("hash details...")
              // console.log(hash)
              // console.log(hash.length)

              data.user_password = hash;
        connection.query('insert into User set ?', [data], function(err, results) {
  			if (err) return next(err);
			  res.redirect('/');
        });
      });
    });
  });
};

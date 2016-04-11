var bcrypt = require('bcrypt');

exports.showUser = function(req, res, next){
  var admin = req.session.description === 'admin'
  var user = req.session.user;
  console.log(user);
  req.getConnection(function(err, connection){
    if(err) return next(err);
    connection.query('SELECT * FROM User WHERE user_name != ?', [user], function(err, results){
      for(var result in results){
        var description = results[result];
        // console.log(results);
        console.log(description);
      };
      if(err) throw err;
      res.render('User',{
        user : results,
        admin : admin,
        description : description !== 'admin'
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
        data.user_password = hash;
        connection.query('insert into User set ?', [data], function(err, results) {
          if (err) return next(err);
          res.redirect('/');
        });
      });
    });
  });
};

// exports.makeAdmin = function(req, res, next){
//   req.getConnection(function(err, connection){
//     var user_id = req.params.user_id;
//     connection.query('UPDATE User SET description =\'admin\' WHERE user_id = ?', [user_id], function(err, rows){
//       if(err) return next(err);
//       res.redirect('/User');
//     });
//   });
// };

exports.makeCustomer = function(req, res, next){
  req.getConnection(function(err, connection){
    var user_id = req.params.user_id;
    var description = req.body.description;
    connection.query('UPDATE User SET description = ? WHERE user_id = ?', [description, user_id], function(err, rows){
      if(err) return next(err);
      res.redirect('/User');
    });
  });
};

exports.delete = function(req, res, next){
  var user_id = req.params.user_id;
  req.getConnection(function(err, connection){
    connection.query('DELETE FROM User WHERE user_id = ?', [user_id], function(err, rows){
      if(err) return next(err);
      res.redirect('/User');
    });
  });
};

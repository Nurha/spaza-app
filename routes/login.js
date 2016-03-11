var bcrypt = require('bcrypt');

exports.userLogin = function(req, res){
	res.render('login_signup')
};

exports.check = function(req,res,next){
  if(req.session.user){
    next();
  }
  else{
    res.redirect('/');
  }
};

exports.login = function(req, res, next){
	req.getConnection(function(err, connection){
		var input = JSON.parse(JSON.stringify(req.body));
		// console.log(input);

			var user_name = input.user_name;

			if(err){
				return next(err);
			};
			connection.query('SELECT * FROM User WHERE user_name = ?', user_name, function(err, users){
				console.log(JSON.stringify(users[0].description) +'im here');

				var user = users[0];
				bcrypt.compare(input.user_password, user.user_password, function(err, pass){
					// console.log(user);
					if(err){
						next(err)
					};
					if(pass){

						req.session.user = user_name;
						req.session.description = user.description;
						return res.redirect('/home');
					}
					else {
						res.redirect('/');
					};
				});
			});
		});
};

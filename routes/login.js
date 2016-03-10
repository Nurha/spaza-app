var bcrypt = require('bcrypt');

exports.userLogin = function(req, res){
	res.render('login_signup')
};

exports.login = function(req, res, next){
	req.getConnection(function(err, connection){
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			 user_name : input.user_name,
       user_password : input.user_password,
		};
			if(error){
				return next(error);
			};
			connection.query('SELECT * FROM User WHERE user_name = ?', data, function(err, users){
				var user = users[0];
				bcrypt.compare(input.users[0].password, function(error, pass){
					if(error){
						console.log(error)
					};
					if(pass){
						req.session.user = user_name;
						req.session.description = user.description;
						return res.redirect('/home');
					}
					else {
						res.redirect('/');
					}
				});
			});
		});
};

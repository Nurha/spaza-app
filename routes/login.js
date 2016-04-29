var bcrypt = require('bcrypt');

exports.userLogin = function(req, res){
	res.render('login_signup',{
		layout : false
	});
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
		var user_name = req.body.user_name;

		// var count = 0;
		// var lock = false;

		if(err){
			return next(err);
		};
		connection.query('SELECT * FROM User WHERE user_name = ?', user_name, function(err, users){
			if(users[0] === undefined){
				req.flash('message', 'invalid username');
				return res.redirect('/');
			};

			var user = users[0];
			bcrypt.compare(req.body.user_password, user.user_password, function(err, pass){
				if(err){
					next(err)
				};

				if(pass){
					req.session.user = user_name;
					req.session.description = user.description;
					return res.redirect('/home');
				}
				else{
					req.flash('message', 'invalid password');
					res.redirect('/');
				};
			});
		});
	});
};

exports.logout = function(req, res){
	delete req.session.user
	req.flash('message', 'You have logged out');
	res.redirect('/');
};

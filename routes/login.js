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

// exports.updateStatus = function(req, res, next){
// 	req.getConnection(function(err, connection){
// 		var input = JSON.parse(JSON.stringify(req.body));
// 		var user_password = input.user_password;
// 		connection.query('SELECT user_password FROM Users WHERE user_password = ?',[user_password] ,function(err, result){
// 	var count = 0;
// 	var lock = false;
// 	count++;
// 	if(count === 3){
//
// 	};
// 	else (lock === true){
// 		req.flash('message', 'Sorry, your account has been locked');
// 		return res.redirect('/');
// 	};
// 		)};
// 	});
// };

exports.login = function(req, res, next){
	req.getConnection(function(err, connection){
		var input = JSON.parse(JSON.stringify(req.body));
		var user_name = input.user_name;

		var count = 0;
		var lock = false;

		if(err){
			return next(err);
		};
		connection.query('SELECT * FROM User WHERE user_name = ?', user_name, function(err, users){
			if(users[0] === undefined){
				req.flash('message', 'invalid username');
				return res.redirect('/');
			};

			var user = users[0];
			bcrypt.compare(input.user_password, user.user_password, function(err, pass){
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

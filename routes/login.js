var bcrypt = require('bcrypt');

exports.userLogin = function(req, res){
	res.render('login_signup')
};

// exports.login = function(req, res, next){
// 	req.getConnection(function(err, connection){
// 		var input = JSON.parse(JSON.stringify(req.body));
// 		var data = {
// 			user_name : input.user_name,
//       user_password : input.user_password,
// 			if(err){
// 				return next(err);
// 			};
// 		};
// 	});
// };

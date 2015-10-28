exports.showCategories = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) next(err);
		connection.query('SELECT * FROM Categories', [], function(err, results){
			res.render('Categories', {
				no_categories : results.length===0,
				categories : results
			});
		});
	});
};


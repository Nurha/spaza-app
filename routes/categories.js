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

exports.showAddCategories = function(req, res){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('SELECT * FROM Categories', [], function(err, categories){
			if(err) return next(err);
			res.render('addCategories', {
				categories : categories
			});
		});
	});
};

exports.addCategories = function(req, res, next){
	req.getConnection(function(err,connection){
		if(err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			category_id : input.category_id,
			category_name : input.category_name
		};
		connection.query('insert into Categories set ?', data, function(err, results) {
  			if (err) return next(err);
			res.redirect('/categories');
		});
	});
};

// exports.getCategories = function(req, res, next){
// 	var category_id = req.params.category_id;
// 	req.getConnection(function(err, connection){
// 		connection.query('SELECT * FROM Categories WHERE category_id = ?', [category_id], function(err, rows){
// 			if(err) return next(err);
// 			res.render('editCategories', {page_title:'Edit Customers - Node.js', data : rows[0]});
// 		});
// 	});
// };

// exports.updateCategories = function(req, res, next){
// 	var data = JSON.parse(JSON.stringify(req.body));
//   	var category_id = req.params.category_id;
//   	req.getConnection(function(err, connection){
// 		connection.query('UPDATE Categories SET ? WHERE category_id = ?', [data, category_id], function(err, rows){
//     		if (err) next(err);
//           	res.redirect('/categories');
//     	});
// 	});
// };

exports.delete = function(req, res, next){
	var category_id = req.params.category_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Categories WHERE category_id = ?', [category_id], function(err,rows){
			if(err) return next(err);
			res.redirect('/categories');
		});
	});
};

exports.categoriesPopularity = function(req, res, next){
	var categories_id = req.params.categories_id;
	req.getConnection(function(err, connection){
		connection.query( 'SELECT Categories.category_name, sum( Sales.Qty ) AS qty FROM Sales INNER JOIN Products ON Sales.product_id = Products.product_id INNER JOIN Categories ON Products.Category_id = Categories.category_id GROUP BY Categories.category_name ORDER BY qty DESC', [] , function(err, results) {
			if(err) return next(err);
			res.render('categoriesPopularity', {
				categoriesPopularity: results
			});
		});
	});
};
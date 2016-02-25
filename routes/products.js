exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT Products.product_id, Products.product_name, Categories.category_name FROM Products INNER JOIN Categories ON Categories.category_id = Products.category_id ORDER BY product_id', [], function(err, results) {

        		if (err) return next(err);
    			res.render( 'Products', {
					no_products : results.length === 0,
					products : results

    			});

		});
	});
};

exports.home = function(req, res){
	res.render('home')
}

exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from Categories', [], function(err, categories) {
			res.render('addProducts', {
				categories: categories
			});
		});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		product_name : input.product_name,
      		category_id : input.category_id
  		};
		connection.query('insert into Products set ?', data, function(err, results) {
  			if (err) return next(err);
			res.redirect('/products');
		});
	});
};

exports.get = function(req, res, next){
	var product_id = req.params.product_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Products WHERE product_id = ?', [product_id], function(err, rows){
			connection.query('SELECT * FROM Categories', [], function(err,results){
				if(err) return next(err);
				res.render('edit',{
					page_title:"Edit Products - Node.js",
					data : rows[0],
					categories : results
				});
			});
		});
	});
};

exports.update = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
    var product_id = req.params.product_id;
    req.getConnection(function(err, connection){
		connection.query('UPDATE Products SET ? WHERE product_id = ?', [data, product_id], function(err, rows){
    		if (err) next(err);
            res.redirect('/products');
    	});
    });
};



exports.delete = function(req, res, next){
	var product_id = req.params.product_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Products WHERE product_id = ?', [product_id], function(err,rows){
			if(err) return next(err);
			res.redirect('/products');
		});
	});
};

exports.productPopularity = function(req, res, next){
	var product_id = req.params.product_id;
	req.getConnection(function(err, connection){
		connection.query( 'SELECT product_name, supplier_name, Sum(Sales.qty) AS qty FROM Products, Sales, Purchases, Suppliers, WHERE Products.product_id = Sales.product_id AND Products.product_id = Purchases.product_id AND Purchases.supplier_id = Suppliers.supplier_id GROUP BY Products.product_name ORDER BY qty DESC', [], function(err, results) {
			if(err) return next(err);
			res.render('productPopularity', {
				productPopularity: results
			});
		});
	});
};

exports.productEarnings = function(req, res, next){
	var product_id = req.params.product_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT Products.product_name, SUM(Sales.qty * Sales.sales_price) AS earnings FROM Sales INNER JOIN Products ON Sales.product_id = Products.product_id GROUP BY Products.product_name ORDER BY earnings DESC',[], function(err, result){
			if(err) return(err);
			res.render('productEarnings',{
					productEarnings: result
			});
		});
	});
};

exports.productProfits = function(req, res, next){
	var product_id = req.params.prroduct_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT product_name, supplier_name, (sales_price-cost_price) AS Profit FROM Products, Sales, Purchases, Suppliers WHERE Products.product_id = Sales.product_id And Sales.product_id = Purchases.product_id AND Purchases.supplier_id = Suppliers.supplier_id GROUP BY product_name ORDER BY Profit DESC', [], function(err, result){
			if(err) return(err);
			res.render('productProfits',{
				productProfits : result
			});
		});
	});
};

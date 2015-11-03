exports.showSales = function (req, res, next){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT  Sales.sales_id, Products.product_name, Sales.qty, Sales.date, Sales.sales_price FROM Sales INNER JOIN Products ON Sales.product_id = Products.product_id ORDER BY Sales.date DESC', [], function(err, results){
			
				res.render('Sales',{
					no_sales : results.length === 0,
					sales : results
					
				
			});
		});
	});
};

exports.showAddSales = function(req, res){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * FROM Products', [], function(err, products){
			if (err) return next(err);
			res.render('addSales',{ products : products});
		});
	});
};

exports.addSales = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data ={
			product_id : input.product_id,
			date : input.date,
			sales_price :input.sales_price,
			qty : input.qty,
		};
		connection.query('INSERT INTO Sales SET ?', data, function(err,results) {
			if (err) return next(err);
			res.redirect('/sales');
		});
	});
};

exports.getSales = function(req, res, next){
	var sales_id = req.params.sales_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Sales WHERE sales_id = ?', [sales_id], function(err, rows){
			connection.query('SELECT * FROM Products', [], function(err, results){
				if(err) return next(err);
				 console.log(results);
				res.render('editSales',{
					page_title:"Edit Sales - Node.js",
					data : rows[0],
					products : results
				});
			});
		});
	});
};

exports.updateSales = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
    var sales_id = req.params.sales_id;
    req.getConnection(function(err, connection){
			connection.query('UPDATE Sales SET ? WHERE sales_id = ?', [data, sales_id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/sales');
    		});
    });
};

exports.delete = function(req, res, next){
	var sales_id = req.params.sales_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Sales WHERE sales_id = ?', [sales_id], function(err,rows){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};



exports.showSales = function (req, res, next){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT  Products.product_name, Sales.qty, Sales.date, Sales.sales_price FROM Sales INNER JOIN Products ON Sales.product_id = Products.product_id ORDER BY Sales.date', [], function(err, results){
			connection.query('SELECT * FROM Products', [], function(err, products){
				if (err) return next(err);
				res.render('Sales',{
					no_sales : results.length === 0,
					sales : results,
					products : products,
				});
			});
		});
	});
};

exports.showAddSales = function(req, res){
	res.render('Sales');
}

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
		connection.query('SELECT * FROM Sales WHERE sales_id = ?', [sales_id], function(err,rows){
			if(err) return next(err);
			res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
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

exports.deleteSales = function(req, res, next){
	var sales_id = req.params.sales_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Sales WHERE sales_id = ?', [sales_id], function(err,rows){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};



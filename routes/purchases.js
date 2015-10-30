exports.showPurchases = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('SELECT Purchases.purchase_id, Suppliers.supplier_name, Products.product_name, Purchases.cost_price, Purchases.qty, DATE_FORMAT(Purchases.date, "%d/%l/%Y") as date FROM Purchases INNER JOIN Suppliers ON Suppliers.supplier_id = Purchases.supplier_id INNER JOIN Products ON Products.product_id = Purchases.product_id ORDER BY Purchases.date DESC', [], function(err, results){
			res.render('Purchases',{
				no_purchases : results.length===0,
				purchases : results
			});
		});
	});
};

exports.showAddPurchases = function(req, res){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * FROM Products', [], function(err, products){
			connection.query('SELECT * FROM Suppliers', [], function(err, suppliers){

				if (err) return next(err);
				res.render('addPurchases',{ 
					products : products,
                	suppliers : suppliers
		
            	});
			});
		});

	});
};

exports.addPurchases = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data ={
			product_id : input.product_id,
			supplier_id : input.supplier_id,
			date : input.date,
			cost_price :input.cost_price,
			qty : input.qty,
		};
		connection.query('INSERT INTO Purchases SET ?', data, function(err,results) {
			if (err) return next(err);
			res.redirect('/purchases');
		});
	});
};

// exports.getPurchases = function(req, res, next){
// 	var sales_id = req.params.sales_id;
// 	req.getConnection(function(err, connection){
// 		connection.query('SELECT * FROM Sales WHERE sales_id = ?', [sales_id], function(err,rows){
// 			if(err) return next(err);
// 			res.render('editSales',{page_title:"Edit Customers - Node.js", data : rows[0]});
// 		});
// 	});
// };
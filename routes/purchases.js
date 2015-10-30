exports.showPurchases = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('SELECT Purchases.purchase_id, Suppliers.supplier_name, Products.product_name, Purchases.cost_price, Purchases.qty, Purchases.date FROM Purchases INNER JOIN Suppliers ON Suppliers.supplier_id = Purchases.supplier_id INNER JOIN Products ON Products.product_id = Purchases.product_id ORDER BY Purchases.date DESC', [], function(err, results){
			res.render('Purchases',{
				no_purchases : results.length===0,
				purchases : results
			});
		});
	});
};
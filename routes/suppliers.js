exports.showSuppliers = function(req, res, next){
	var admin = req.session.description === 'admin'
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('SELECT * FROM Suppliers ORDER BY supplier_id', [], function(err, results){
			res.render('Suppliers',{
				no_suppliers : results.length===0,
				suppliers : results,
				admin : admin
			});
		});
	});
};

exports.showAddSuppliers = function(req, res){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('SELECT * FROM Suppliers', [], function(err, suppliers){
			if(err) return next(err);
			res.render('addSuppliers', {
				suppliers : suppliers
			});
		});
	});
};

exports.addSuppliers = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			//supplier_id : input.supplier_id the id is auto incrimented
			supplier_name :input.supplier_name
		};
		connection.query('INSERT INTO Suppliers SET ?', data, function(err, results){
			if(err) return next(err);
			res.redirect('/suppliers');
		});
	});
};
exports.getSuppliers = function(req, res, next){
	var supplier_id = req.params.supplier_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Suppliers WHERE supplier_id = ?', [supplier_id], function(err, rows){
			if(err) return next(err);
			res.render('editSuppliers', {page_title:'Edit Categories - Node.js', data : rows[0]});
		});
	});
};

exports.updateSuppliers = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
  	var supplier_id = req.params.supplier_id;
  	req.getConnection(function(err, connection){
		connection.query('UPDATE Suppliers SET ? WHERE supplier_id = ?', [data, supplier_id], function(err, rows){
    		if (err) next(err);
          	res.redirect('/suppliers');
    	});
	});
};

exports.delete = function(req, res, next){
	var supplier_id = req.params.supplier_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Suppliers WHERE supplier_id = ?', [supplier_id], function(err, rows){
			if(err) return next(err);
			res.redirect('/suppliers');
		});
	});
};

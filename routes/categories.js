exports.showCategories = function(req, res, next) {
  var admin = req.session.description === 'admin'
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * FROM Categories', [], function(err, results) {
      res.render('Categories', {
        no_categories: results.length === 0,
        categories: results,
        admin : admin

      });
    });
  });
};

exports.showAddCategories = function(req, res) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * FROM Categories', [], function(err, categories) {
      if (err) return next(err);
      res.render('addCategories', {
        categories: categories
      });
    });
  });
};

exports.addCategories = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      category_id: input.category_id,
      category_name: input.category_name
    };
    connection.query('insert into Categories set ?', data, function(err, results) {
      if (err) return next(err);
      res.redirect('/categories');
    });
  });
};

exports.getCategories = function(req, res, next) {
  var category_id = req.params.category_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM Categories WHERE category_id = ?', [category_id], function(err, rows) {
      if (err) return next(err);
      res.render('editCategories', {
        data: rows[0]
      });
    });
  });
};

exports.updateCategories = function(req, res, next) {
  var data = JSON.parse(JSON.stringify(req.body));
  var category_id = req.params.category_id;
  req.getConnection(function(err, connection) {
    connection.query('UPDATE Categories SET ? WHERE category_id = ?', [data, category_id], function(err, rows) {
      if (err) next(err);
      res.redirect('/categories');
    });
  });
};

exports.delete = function(req, res, next) {
  var category_id = req.params.category_id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM Categories WHERE category_id = ?', [category_id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/categories');
    });
  });
};

exports.categoriesPopularity = function(req, res, next) {
  var admin = req.session.description === 'admin'
  var categories_id = req.params.categories_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT Categories.category_name, sum( Sales.Qty ) AS qty FROM Sales INNER JOIN Products ON Sales.product_id = Products.product_id INNER JOIN Categories ON Products.Category_id = Categories.category_id GROUP BY Categories.category_name ORDER BY qty DESC', [], function(err, results) {
      if (err) return next(err);
      res.render('categoriesPopularity', {
        categoriesPopularity: results,
        admin : admin
      });
    });
  });
};

exports.categoryEarnings = function(req, res, next) {
  var admin = req.session.description === 'admin'
  req.getConnection(function(err, connection) {
    connection.query('SELECT Categories.category_name, SUM(Sales.qty * Sales.sales_price) AS earnings FROM Sales INNER JOIN Products ON Sales.product_id = Products.product_id INNER JOIN Categories ON Categories.category_id = Products.category_id GROUP BY Categories.category_name ORDER BY earnings DESC', [], function(err, result) {
      if (err) return next(err);
      res.render('categoryEarnings', {
        categoryEarnings: result,
        admin : admin
      });
    });
  });
};

exports.categoryProfits = function(req, res, next) {
  var admin = req.session.description === 'admin'
  req.getConnection(function(err, connection) {
    connection.query('SELECT category_name, supplier_name, SUM(sales_price - cost_price) AS profit FROM Products, Sales, Purchases, Suppliers, Categories	WHERE Products.product_id = Sales.product_id AND Products.product_id = Purchases.product_id AND Purchases.supplier_id = Suppliers.supplier_id AND Products.category_id = Categories.category_id GROUP BY category_name ORDER BY profit DESC;', [], function(err, result) {
      if (err) return next(err);
      res.render('categoryProfits', {
        categoryProfits: result,
        admin : admin
      });
    });
  });
};

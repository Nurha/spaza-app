'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt'),
    session = require('express-session'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    categories = require('./routes/categories'),
    suppliers = require('./routes/suppliers'),
    login = require('./routes/login'),
    user = require('./routes/user'),
    purchases = require('./routes/purchases');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'coder123',
      port: 3306,
      database: 'spaza_app'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers
app.get('/signup', user.addUser);
app.post('/signup',user.addUser );
app.get('/user', user.showUser);

app.get('/', login.userLogin);

app.get('/home', products.home);
app.get('/products', products.show);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/edit/:product_id', products.get);
app.post('/products/update/:product_id', products.update);
app.get('/products/delete/:product_id', products.delete);
app.get('/products/productPopularity', products.productPopularity);
app.get('/products/productEarnings', products.productEarnings);
app.get('/products/productProfits', products.productProfits);

app.get('/sales', sales.showSales);
app.get('/sales/add', sales.showAddSales);
app.post('/sales/add', sales.addSales);
app.get('/sales/editSales/:sales_id', sales.getSales);
app.post('/sales/updateSales/:sales_id', sales.updateSales);
app.get('/sales/delete/:sales_id', sales.delete);

app.get('/categories', categories.showCategories);
app.get('/categories/addCategories', categories.showAddCategories);
app.post('/categories/addCategories', categories.addCategories);
app.get('/categories/editCategories/:category_id', categories.getCategories);
app.post('/categories/updateCategories/:category_id', categories.updateCategories);
app.get('/categories/delete/:category_id', categories.delete);
app.get('/categories/categoriesPopularity', categories.categoriesPopularity);
app.get('/categories/categoryEarnings', categories.categoryEarnings);
app.get('/categories/categoryProfits', categories.categoryProfits);

app.get('/suppliers', suppliers.showSuppliers);
app.get('/suppliers/addSuppliers', suppliers.showAddSuppliers);
app.post('/suppliers/addSuppliers', suppliers.addSuppliers);
app.get('/suppliers/editSuppliers/:supplier_id', suppliers.getSuppliers);
app.post('/suppliers/updateSuppliers/:supplier_id', suppliers.updateSuppliers);
app.get('/suppliers/delete/:supplier_id', suppliers.delete);

app.get('/purchases', purchases.showPurchases);
app.get('/purchases/addPurchases', purchases.showAddPurchases);
app.post('/purchases/addPurchases', purchases.addPurchases);
app.get('/purchases/editPurchases/:purchase_id', purchases.getPurchases);
app.post('/purchases/updatePurchases/:purchase_id', purchases.updatePurchases);
app.get('/purchases/delete/:purchase_id', purchases.delete);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3002;

//start everything up
app.listen(portNumber, function () {
    console.log('listening on:', portNumber);
});

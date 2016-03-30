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

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 5600000 }, resave: true, saveUninitialized: true}));

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}


//setup the handlers
app.get('/signup', user.addUser);
app.post('/signup',user.addUser );
app.get('/user', user.showUser);

app.get('/', login.userLogin);
app.post('/', login.login);
app.get('/logout',login.logout);
app.use(login.check);


app.get('/home', login.check, products.home);
app.get('/products/search/:searchVal', login.check, products.searchProducts);
app.get('/products',login.check, products.show);
app.get('/products/add', login.check, products.showAdd);
app.post('/products/add', login.check, products.add);
app.get('/products/edit/:product_id',login.check, products.get);
app.post('/products/update/:product_id',login.check, products.update);
app.get('/products/delete/:product_id',login.check, products.delete);
app.get('/products/productPopularity',login.check, products.productPopularity);
app.get('/products/productEarnings',login.check, products.productEarnings);
app.get('/products/productProfits',login.check, products.productProfits);

app.get('/sales',login.check, sales.showSales);
app.get('/sales/add',login.check, sales.showAddSales);
app.post('/sales/add',login.check, sales.addSales);
app.get('/sales/editSales/:sales_id',login.check, sales.getSales);
app.post('/sales/updateSales/:sales_id',login.check, sales.updateSales);
app.get('/sales/delete/:sales_id',login.check, sales.delete);

app.get('/categories',login.check, categories.showCategories);
app.get('/categories/addCategories',login.check, categories.showAddCategories);
app.post('/categories/addCategories',login.check, categories.addCategories);
app.get('/categories/editCategories/:category_id',login.check, categories.getCategories);
app.post('/categories/updateCategories/:category_id',login.check, categories.updateCategories);
app.get('/categories/delete/:category_id',login.check, categories.delete);
app.get('/categories/categoriesPopularity',login.check, categories.categoriesPopularity);
app.get('/categories/categoryEarnings',login.check, categories.categoryEarnings);
app.get('/categories/categoryProfits',login.check, categories.categoryProfits);

app.get('/suppliers',login.check, suppliers.showSuppliers);
app.get('/suppliers/addSuppliers',login.check, suppliers.showAddSuppliers);
app.post('/suppliers/addSuppliers',login.check, suppliers.addSuppliers);
app.get('/suppliers/editSuppliers/:supplier_id',login.check, suppliers.getSuppliers);
app.post('/suppliers/updateSuppliers/:supplier_id',login.check, suppliers.updateSuppliers);
app.get('/suppliers/delete/:supplier_id',login.check, suppliers.delete);

app.get('/purchases',login.check, purchases.showPurchases);
app.get('/purchases/addPurchases',login.check, purchases.showAddPurchases);
app.post('/purchases/addPurchases',login.check, purchases.addPurchases);
app.get('/purchases/editPurchases/:purchase_id',login.check, purchases.getPurchases);
app.post('/purchases/updatePurchases/:purchase_id',login.check, purchases.updatePurchases);
app.get('/purchases/delete/:purchase_id',login.check, purchases.delete);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3002;

//start everything up
app.listen(portNumber, function () {
    console.log('listening on:', portNumber);
});

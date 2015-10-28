'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    categories = require('./routes/categories');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'venom101',
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
app.get('/', products.home);
app.get('/products', products.show);
app.get('/products/edit/:product_id', products.get);
app.post('/products/update/:product_id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/delete/:product_id', products.delete);
app.get('/products/productPopularity', products.productPopularity);

app.get('/sales', sales.showSales);
app.get('/sales/editSales/:sales_id', sales.getSales);
app.post('/sales/updateSales/ :sales_id', sales.updateSales);
app.get('/sales/add', sales.showAddSales);
app.post('/sales/add', sales.addSales);
app.get('/sales/delete/:sales_id', sales.delete);

app.get('/categories', categories.showCategories);


app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3002;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});

var express = require('express');
var exphbs  = require('express-handlebars');
var item = require('./itemsSold');
var mostPopularProd = require('./mostPopular')

var app = express();
var fs = require("fs");
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/sold', function (req, res) {
	var productNames = item.productsSold('./Nelisa Sales History.csv');
    res.render('ItemSold', {products: productNames});
});

app.get('/popular', function (req, res) {
	var mostPopularProduct = mostPopularProd.mostPopular('./Nelisa Sales History.csv');
	res.render('mostPopular',{product: mostPopularProduct});
});
 
app.listen(3000);

var express = require('express');
var exphbs  = require('express-handlebars');

var item = require('./itemsSold');
var mostPopularProd = require('./mostPopular');
var categoryCalculations = require('./categoryCalculations');
var findMostPopularCategory = require('./findMostPopularCategory');
var leastPopularProd = require('./leastPopular');
var leastPopularCat = require('./findLeastPopularCategory');

var app = express();
var fs = require("fs");
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home', {layout : false});
});

app.get('/sold', function (req, res) {
	var productNames = item.productsSold('./Nelisa Sales History.csv');
    res.render('ItemSold', {products: productNames});
});

app.get('/popular', function (req, res) {
	var mostPopularProduct = mostPopularProd.mostPopular('./Nelisa Sales History.csv');
	res.render('mostPopular',{product: mostPopularProduct});
});

app.get('/category', function (req, res){
	var categoriesNames = categoryCalculations.getSalesPerCategory('./Nelisa Sales History.csv');
	res.render ('category', {category: categoriesNames});
});

app.get('/mostPopularCategory', function (req, res){
	var categoryName = findMostPopularCategory.findMostProfitableCategory('./Nelisa Sales History.csv');
	res.render('mostPopularCategory',{category: categoryName});
});

app.get('/leastPopular', function (req, res){
	var leastPopularProduct = leastPopularProd.leastPopular('./Nelisa Sales History.csv');
	res.render('leastPopProd',{product: leastPopularProduct});
});

app.get('/leastPopularCategory', function (req, res){
	var catName = leastPopularCat.findLeastPopularCategory ('./Nelisa Sales History.csv');
	res.render('leastPopularCategory',{category : catName});
}); 
 
 var server = app.listen(3000, function () {

     var host = server.address().address;
     var port = server.address().port;

     console.log('app listening at http://%s:%s', host, port);

   });
var fs  = require("fs"); 
var itemsSold = require('./itemsSold');

var findProducts = function (fileName) {
    
    var productsMap = itemsSold.productsSold(fileName);
    // console.log("***********************************************************")
    // console.log("***********************************************************")
    // console.log("***********************************************************")
    // console.log("***********************************************************")
   // console.log(productsMap);
    //console.log(Object.keys(productsMap));

    return Object.keys(productsMap);

}

exports.linesInFiles = function(fileName){
  var productList = findProducts(fileName);
  return productList;
};
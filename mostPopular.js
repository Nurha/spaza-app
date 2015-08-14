var fs = require("fs"); 
var itemsSold = require('./itemsSold');

exports.mostPopular = function ( fileName) {

    var productsMap = itemsSold.productsSold(fileName);

    // find which product was sold the most of...
    var mostPopularProdct = {}; 
    var max = 0;
    for(var prod in productsMap){
        var value = productsMap[prod];
        if(productsMap[prod] > max){
            max = productsMap[prod];
            mostPopularProdct = {
                prodName: prod,
                amount: max
            };
        };
    };
 
   // console.log(mostPopularProdct);
    return mostPopularProdct;

};
           
 
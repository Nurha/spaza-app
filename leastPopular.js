var fs = require("fs"); 
var itemsSold = require('./itemsSold');

exports.leastPopular = function ( fileName) {

    var productsMap = itemsSold.productsSold(fileName);

    // find which product was sold the most of...
    var leastPopularProdct = {}; 
    var min = 172;
    for(var prod in productsMap){
        var value = productsMap[prod];
        if(productsMap[prod] < min){
            min = productsMap[prod];
            leastPopularProdct = {
                prodName: prod,
                amount: min
            };
        };
    };
 
    //console.log(leastPopularProdct);
    return leastPopularProdct;

};
           
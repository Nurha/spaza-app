var fs = require("fs");

// find how many how each product was sold 
exports.productsSold = function(fileName) {
    var productsMap = {};
    var quantitySold = [];
    // body...

    var fileContent = fs.readFileSync(fileName, "utf8");
    var products = fileContent.split("\r");

    // remove the first line from the list
    products = products.splice(1);

    products.forEach(function(product) {

        var productColumns = product.split(";");
        var productName = productColumns[2];
        var quantity = Number(productColumns[3]);

        if (productsMap[productName] === undefined) {
            quantitySold.push(productName);
            productsMap[productName] = 0;
        }

        productsMap[productName] += quantity;

    });


    //console.log(productsMap);
    return productsMap;
};
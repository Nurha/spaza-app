//var fs = require("fs"); 
var categoryCalculations = require('./categoryCalculations');

exports.findMostProfitableCategory = function ( fileName) {

    var categoryMap = categoryCalculations.getSalesPerCategory(fileName);

     // find which category was sold the most of...
    var mostPopularCategory = {}; 
    var max = 0;
    for(var category in categoryMap){
        var value = categoryMap[category];
        if(categoryMap[category] > max){
            max = categoryMap[category];
            mostPopularCategory = {
                categoryName: category,
                amount: max
            };
        };
    };
 
    //console.log(mostPopularCategory);
    return mostPopularCategory;

};
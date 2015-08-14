var categoryCalculations = require('./categoryCalculations');

exports.findLeastPopularCategory = function ( fileName) {

    var categoryMap = categoryCalculations.getSalesPerCategory(fileName);

     // find which category was sold the most of...
    var leastPopularCategory = {}; 
    var min = 328;
    for(var category in categoryMap){
        var value = categoryMap[category];
        if(categoryMap[category] < min){
            min = categoryMap[category];
            leastPopularCategory = {
                categoryName: category,
                qty: min
            };
        };
    };
 
    //console.log(leastPopularCategory);
    return leastPopularCategory;

};
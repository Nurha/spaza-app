
var fs = require('fs');

var itemsSold = require('./itemsSold');
	

exports.getSalesPerCategory = function (fileName){
	var productCategories = {
		'Milk 1l': 'Dairy',
	    'Imasi': 'Dairy',
	    'Bread': 'Starch',
	    'Chakalaka Can': 'Canned Goods',
	    'Gold Dish Vegetable Curry Can': 'Canned Goods',
	    'Fanta 500ml': 'Softdrinks',
	    'Coke 500ml': 'Softdrinks',
	    'Cream Soda 500ml': 'Softdrinks',
	    'Iwisa Pap 5kg': 'Starch',
	    'Top Class Soy Mince': 'Starch',
	    'Shampoo 1 litre': 'Toiletries',
	    'Soap Bar': 'Toiletries',
	    'Bananas - loose': 'Fruits',
	    'Apples - loose': 'Fruits',
	    'Mixed Sweets 5s': 'Candies',
	    'Heart Chocolates': 'Candies',
	    'Rose (plastic)': 'Gifts',
	    'Valentine Cards': 'Gifts'
}
	var productsMap = itemsSold.productsSold(fileName);
	var categoryMap = {};
	for(var productsName in productsMap){//mapping
		var categoryName = productCategories[productsName];
		var qty = productsMap[productsName];
		if (categoryMap[categoryName] === undefined){
			categoryMap[categoryName] = 0;
		};
		categoryMap[categoryName] += qty;
	};
	//console.log(categoryMap);
    return categoryMap;
	
};


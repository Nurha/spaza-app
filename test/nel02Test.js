var assert = require('assert');


describe('Find data in file', function(){
        
        it('it should show the categories and quantity', function(){
                var categoryCalculations = require('../categoryCalculations');
                var salesPerCategory = categoryCalculations.getSalesPerCategory('./files/Nelisa Sales History.csv');
                var expectedSalesPerCategory = {'Fruits' : 228, 'Candies' : 192, 'Softdrinks' : 328, 'Dairy' : 267, 'Starch' : 275, 'Toiletries' : 76, 'Canned Goods' : 180, 'Gifts' : 28};
                assert.deepEqual(salesPerCategory,expectedSalesPerCategory);
        });
       
        it('it should show the most popular category', function(){
                var mostProfitibleCategory = require('../findMostPopularCategory');
                var profitableCategories = mostProfitibleCategory.findMostProfitableCategory('./files/Nelisa Sales History.csv');
                var expectedCategory = {categoryName : 'Softdrinks', qty : 328};
                assert.deepEqual(expectedCategory,profitableCategories);
                
        });
});
var assert = require('assert');


describe('Find data in file', function(){

       it('should return the product that has sold the least items', function(){
                var leastPopProd = require('../leastPopular');
                var leastPopularProduct = leastPopProd.leastPopular('./files/Nelisa Sales History.csv');
                var expectedLeastPopular = { prodName: 'Rose (plastic)', amount: 14 };
                assert.deepEqual(expectedLeastPopular, leastPopularProduct);
        });

        it('it should show the least popular category', function(){
                var leastPopCategory = require('../findLeastPopularCategory');
                var leastPopularCategory = leastPopCategory.findLeastPopularCategory('./files/Nelisa Sales History.csv');
                var expectedCategory = {categoryName : 'Gifts', qty : 28};
                assert.deepEqual(expectedCategory,leastPopularCategory);
                
        });
        

 });							


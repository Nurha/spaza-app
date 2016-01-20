-- Earnings is defined as the total income from sales
SELECT Products.product_name, SUM(Sales.qty * Sales.sales_price) AS earnings
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
GROUP BY Products.product_name
ORDER BY earnings
DESC ;

SELECT , Categories.category_name, SUM() 
FROM Products
INNER JOIN Categories
ON Categories.category_id = Products.category_id
ORDER BY product_id

SELECT Products.product_name, SUM(Sales.qty * Sales.sales_price) AS earnings 
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
GROUP BY Products.product_name
ORDER BY earnings
DESC ;
SELECT Products.product_name, SUM(Sales.qty) AS qty
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
GROUP BY Products.product_name
ORDER BY qty
DESC LIMIT 1;

--most popular product with supplier
SELECT Products.product_name, Supplier.supplier_name,
Sum(Sales.qty)
AS qty
FROM Products, Sales, Purchases, Suppliers,
WHERE Products.product_id = Sales.product_id
AND Products.product_id = Purchases.product_id
AND Purchases.supplier_id = Suppliers.supplier_id
GROUP BY Products.product_name
ORDER BY qty
DESC;

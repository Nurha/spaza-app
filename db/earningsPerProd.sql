-- Earnings is defined as the total income from sales
--Earnings per product
SELECT Products.product_name, SUM(Sales.qty * Sales.sales_price) AS earnings
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
GROUP BY Products.product_name
ORDER BY earnings
DESC ;

--putting products and categories into table
SELECT Products.product_id, Products.product_name, Categories.category_name
FROM Products
INNER JOIN Categories ON Categories.category_id = Products.category_id
ORDER BY product_id

--get category names and their earnings
SELECT Categories.category_name, Products.product_name
SUM(Sales.qty * Sales.sales_price ) AS earnings
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
INNER JOIN Categories ON Categories.category_id = Products.category_id
GROUP BY Categories.category_name
ORDER BY earnings
DESC;

--product names and profits
SELECT product_name, product_id FROM Products
(SELECT SUM(Sales.qty * Sales.sales_price)AS earnings FROM Sales WHERE Sales.product_id = Products.product_id) -
(SELECT SUM(Purchases.qty * Purchases.cost_price) AS cost FROM Purchases WHERE Purchases.product_id = Products.product_id)
AS profits
GROUP BY Products.product_name
ORDER BY profits
DESC;

SELECT product_name, SUM(Purchases.qty * Purchases.cost_price)
as purchased_at, SUM(Sales.qty * Sales.sales_price)
as made,
SUM((Sales.qty * Sales.sales_price)-(Purchases.qty * Purchases.cost_price))
AS profit
from Purchases
INNER JOIN Products
ON Purchases.product_id = Products.product_id
INNER JOIN Sales
ON Sales.product_id = Products.product_id
GROUP BY Name
ORDER BY profit

SELECT product_name, supplier_name,
(sales_price-cost_price)
AS Profit
FROM Products, Sales, Purchases, Suppliers
WHERE Products.product_id = Sales.product_id
And Sales.product_id = Purchases.product_id
AND Purchases.supplier_id = Supplier.supplier_id
GROUP BY product_name
ORDER BY Profit
DESC;

-- profit per cat
SELECT category_name, supplier_name,
SUM(sales_price - cost_price)
AS profit
FROM Products, Sales, Purchases, Suppliers, Categories
WHERE Products.product_id = Sales.product_id
AND Products.product_id = Purchases.product_id
AND Purchases.supplier_id = Suppliers.supplier_id
AND Products.category_id = Categories.category_id
GROUP BY category_name
ORDER BY profit
DESC;

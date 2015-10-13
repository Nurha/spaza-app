/*SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID=Customers.CustomerID;*/

INSERT INTO Sales(`product_id`, `date`, `sales_price`, `qty`)
SELECT Products.product_id, sales_csv.date, sales_csv.sales_price, sales_csv.no_sold
FROM sales_csv
INNER JOIN Products
ON Products.product_name = sales_csv.stock_item;

INSERT INTO Purchases (`sply_id`, `prod_id`, `date`, `cost_price`, `qty`)
SELECT  Suppliers.sply_id, Products.prod_id, stock_purchases_csv.date, stock_purchases_csv.cost, stock_purchases_csv.quantity
FROM  stock_purchases_csv
INNER JOIN Suppliers
ON Suppliers.supply_name = stock_purchases_csv.shop
INNER JOIN Products
ON Products.prod_name = stock_purchases_csv.item;
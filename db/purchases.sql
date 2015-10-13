INSERT INTO Purchases ( `product_id`, `supplier_id`, `date`, `cost_price`, `qty`)
SELECT  Products.product_id, Suppliers.supplier_id, stock_purchases_csv.date, stock_purchases_csv.cost, stock_purchases_csv.quantity
FROM  stock_purchases_csv
INNER JOIN Suppliers
ON Suppliers.supplier_name = stock_purchases_csv.shop
INNER JOIN Products
ON Products.product_name = stock_purchases_csv.item;
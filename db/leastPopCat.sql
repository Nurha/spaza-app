SELECT Categories.category_name, sum( Sales.Qty ) AS qty
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
INNER JOIN Categories ON Products.Category_id = Categories.category_id
GROUP BY Categories.category_name
ORDER BY qty 
ASC LIMIT 0 , 1
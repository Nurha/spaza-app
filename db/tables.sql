DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
    `category_id` int NOT NULL auto_increment,
    `category_name` char(100),
    PRIMARY KEY(category_id),
    CONSTRAINT uc_category_name  UNIQUE (category_name)
);


DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
    `product_id` int NOT NULL auto_increment,
    `product_name` char(100),
    `category_id` int(42),
    PRIMARY KEY(product_id),
    FOREIGN KEY(category_id) REFERENCES Categories(category_id),
    CONSTRAINT uc_product_name  UNIQUE (product_name)
);

DROP TABLE IF EXISTS `Suppliers`;
CREATE TABLE `Suppliers` (
    `supplier_id` int NOT NULL auto_increment,
    `supplier_name` char(100),
    PRIMARY KEY(supplier_id),
    CONSTRAINT uc_supplier_name  UNIQUE (supplier_name)
);

DROP TABLE IF EXISTS `Purchases`;
CREATE TABLE `Purchases` (
    `purchase_id` int NOT NULL auto_increment,
    `product_id` int(42),
    `supplier_id` int(42),
    `date` date NOT NULL,
    `cost_price` decimal(42,2),
    `qty` int(42),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    PRIMARY KEY(purchase_id)
);

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE  `Sales` (
    `sales_id` int NOT NULL auto_increment,
    `product_id` int(42),
    `date` date NOT NULL,
    `sales_price` decimal(42,2),
    `qty` int(42),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    PRIMARY KEY(sales_id)
);

DROP TABLE IF EXISTS `User`;
CREATE TABLE  `User` (
    `user_id` int NOT NULL auto_increment,
    `user_name` char(100),
    `user_password` varchar(60)NOT NULL,
    `description`varchar(10)NOT NULL,
    `locked` tinyint(1) NOT NULL,
    PRIMARY KEY(user_id)
);

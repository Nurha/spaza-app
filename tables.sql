CREATE TABLE `Categories` (
    `cat_id` int NOT NULL auto_increment,
    `cat_name` char(100),
    PRIMARY KEY(cat_id),
    CONSTRAINT uc_cat_name  UNIQUE (cat_name)
    
);

CREATE TABLE `Products` (
    `prod_id` int NOT NULL auto_increment,
    `prod_name` char(100),
    `cat_id` int(42),
    FOREIGN KEY(cat_id) REFERENCES Categories(cat_id),
    PRIMARY KEY(prod_id),
    CONSTRAINT uc_prod_name  UNIQUE (prod_name)

);

 CREATE TABLE `Suppliers` (
     `sply_id` int NOT NULL auto_increment,
     `supply_name` char(100),
     PRIMARY KEY(sply_id)
);

CREATE TABLE `Purchases` (
    `purchase_id` int NOT NULL auto_increment,
    `prod_id` int(42),
    `sply_id` int(42),
    `date` date NOT NULL,
    `cost_price` decimal(42,1),
    `qty` int(42), 
    FOREIGN KEY (prod_id) REFERENCES Products(prod_id),
    FOREIGN KEY (sply_id) REFERENCES Suppliers(sply_id),
    PRIMARY KEY(purchase_id)
);

CREATE TABLE  `Sales` (
    `sales_id` int NOT NULL auto_increment,
    `prod_id` int(42),
    `date` date NOT NULL,
    `sales_price` decimal(42,1),
    `qty` int(42),
    FOREIGN KEY (prod_id) REFERENCES Products(prod_id),
    PRIMARY KEY(sales_id)
 );

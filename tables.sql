CREATE TABLE Categories (
    cat_id int not null auto_increment,
    cat_name char(100),
    primary key(cat_id),
    CONSTRAINT uc_cat_name  UNIQUE (cat_name)
    
);

CREATE TABLE Products (
    prod_id int not null auto_increment,
    prod_name char(100),
    cat_id int(42),
    primary key(prod_id),
    FOREIGN KEY(cat_id) REFERENCES Categories(cat_id),
    CONSTRAINT uc_prod_name  UNIQUE (prod_name)

);

 create table Suppliers (
     sply_id int not null auto_increment,
     supply_name char(100),
     primary key(sply_id)
);

CREATE TABLE Purchases (
    purchase_id int not null auto_increment,
    name char(100),
    cost_price int(42),
    prod_id int(42),
    FOREIGN KEY (prod_id) REFERENCES Products(prod_id),
    primary key(purchase_id)
);

CREATE TABLE  Sales (
   sales_id int not null auto_increment,
    qty int(42),
    sales_price int(42),
    prod_id int(42),
    FOREIGN KEY (prod_id) REFERENCES Products(prod_id),
    primary key(sales_id)
 );

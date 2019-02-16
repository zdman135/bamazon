CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id int auto_increment not null,
  product_name varchar(100) not null ,
  price decimal(6,2) null ,
  stock_quantity integer(100) null,
  primary key (item_id)
);


insert into products(product_name, price, stock_quantity)
  values('apples', 2.99, 35);

insert into products(product_name, price, stock_quantity)
  values('pears', 3.99, 25);

insert into products(product_name, price, stock_quantity)
  values('grapes', 4.68, 99);

insert into products(product_name, price, stock_quantity)
  values('strawberries', 5.98, 55);

insert into products(product_name, price, stock_quantity)
  values('raspberries', 4.34, 44);

insert into products(product_name, price, stock_quantity)
  values('blackberries', 7.83, 33);

insert into products(product_name, price, stock_quantity)
  values('blueberries', 19.95, 66);

insert into products(product_name, price, stock_quantity)
  values('bananas', 0.68, 22);

insert into products(product_name, price, stock_quantity)
  values('oranges', 13.23, 45);

insert into products(product_name, price, stock_quantity)
  values('pineapples', 26.32, 30);
  
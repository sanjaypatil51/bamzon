DROP DATABASE IF EXISTS bamzon;
-- Creates the "bamzon" database --
CREATE DATABASE bamzon;


USE bamzon;

create table products (item_id int auto_increment primary key,
product_name varchar(30),
department_name varchar(30),
price int,
stock_quantity int);

insert into products(product_name,department_name,price,stock_quantity)
values("Columbia Jacket Denim","Clothing",25,100);

insert into products(product_name,department_name,price,stock_quantity)
values("Power Strip","Electric",15,200);

insert into products(product_name,department_name,price,stock_quantity)
values("Cannon 80d Camera","Electronic",800,200);

insert into products(product_name,department_name,price,stock_quantity)
values("T Shirt","Clothing",15,500);

insert into products(product_name,department_name,price,stock_quantity)
values("Battery AA","Electric",10,500);

insert into products(product_name,department_name,price,stock_quantity)
values("Niok Camera","Electronic",560,300);

insert into products(product_name,department_name,price,stock_quantity)
values("Samsung TV LED","Electronic",450,150);





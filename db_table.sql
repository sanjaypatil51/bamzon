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


alter table products add product_sales INT;



create table department(department_id INT primary key auto_increment,
department_name varchar(30),
over_head_costs int);

insert into department(department_name,over_head_costs)
values("Clothing",10000);

insert into department(department_name,over_head_costs)
values("Electronic",15000);

insert into department(department_name,over_head_costs)
values("Electric",50000);

insert into department(department_name,over_head_costs)
values("Sport",75000);



select * from products;

select * from department


SELECT stock_quantity from products where item_id=1

SELCET * from products where stock_quantity<=5





create database test;
use test;
CREATE TABLE items (
	nombre varchar(30) not null,
    categoria varchar(30) not null,
    stock int unsigned,
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
);

INSERT INTO `test`.`items` (`nombre`, `categoria`, `stock`) VALUES ('Fideos', 'Harina', '30');
INSERT INTO `test`.`items` (`nombre`, `categoria`, `stock`) VALUES ('Leche', 'Lacteos', '20');
INSERT INTO `test`.`items` (`nombre`, `categoria`, `stock`) VALUES ('Crema', 'Lacteos', '15');


update test.items set stock = 45 where (items.id = 2);

select * from test.items;

delete from test.items where (items.id = 3);

select * from test.items;
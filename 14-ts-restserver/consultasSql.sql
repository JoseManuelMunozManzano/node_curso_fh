CREATE DATABASE node;

CREATE TABLE node.usuarios(
id int not null auto_increment,
name varchar(255) not null,
email varchar(255) not null,
estado tinyint not null default 1,
 PRIMARY KEY (id)
);

CREATE DATABASE node;

CREATE TABLE node.usuarios(
id int not null auto_increment,
name varchar(255) not null,
email varchar(255) not null,
estado tinyint not null default 1,
createdAt timestamp,
updatedAt timestamp,
 PRIMARY KEY (id)
);

-- Constraint
CREATE UNIQUE INDEX USUARIOS_EMAIL_INDEX ON NODE.USUARIOS(email);


-- Carga inicial
INSERT INTO NODE.USUARIOS(NAME, EMAIL, ESTADO) VALUES('José Manuel', 'jm@gmail.es', 1);
INSERT INTO NODE.USUARIOS(NAME, EMAIL, ESTADO) VALUES('Adriana', 'adri@gmail.es', 1);
INSERT INTO NODE.USUARIOS(NAME, EMAIL, ESTADO) VALUES('Marina', 'marina@gmail.es', 0);

DROP DATABASE `backend`;
CREATE DATABASE `backend`;
SHOW DATABASES;
USE `backend`;

CREATE TABLE supermarket (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(64),
    description text,
    address varchar(128),
    city varchar(64),
    zipcode VARCHAR (10),
    image blob,
    image_url varchar(256),
	PRIMARY KEY (id)
);

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    idsupermarket int,
    username varchar(64),
    password varchar(64),
    email varchar(256),
    role int,
    premium boolean,
    age INT,
    gender BOOL,
    realname varchar(64)  ,
    realsurname VARCHAR(64) ,
    country	VARCHAR(64) ,
    image blob,
    image_url varchar(256),
	PRIMARY KEY (id),
    FOREIGN KEY (idsupermarket) REFERENCES supermarket(id)
);

CREATE TABLE paymenthistory (
    id INT NOT NULL AUTO_INCREMENT,
    iduser int,
    ammount decimal(10, 2),
    date date,
    description varchar(256),
	PRIMARY KEY (id),
    FOREIGN KEY (iduser) REFERENCES user(id)
);

CREATE TABLE discount (
    id INT NOT NULL AUTO_INCREMENT,
    idclient int,
    idsupermarket int,
    percentage decimal(10, 2),
    expiration DATE,
	PRIMARY KEY (id),
    FOREIGN KEY (idclient) REFERENCES user(id),
    FOREIGN KEY (idsupermarket) REFERENCES supermarket(id)
);

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    category_name varchar(64),
    image blob,
    image_url varchar(256),
	PRIMARY KEY (id)
);

CREATE TABLE allergies (
    id INT NOT NULL AUTO_INCREMENT,
    allergy_name varchar(64),
    allergy_description varchar(256),
	PRIMARY KEY (id)
);

CREATE TABLE brand (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(64),
    image blob,
    image_url varchar(256),
    PRIMARY KEY (id)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    iduser int,
    idcategory int,
    idallergy int,
    barcode varchar(64),
    product_name varchar(64),
    quantity decimal(10, 2),
    measurement varchar(64),
    idbrand int,
    product_description text,
    price decimal(10, 2),
    likes int,
    image blob,
    image_url varchar(256),
	PRIMARY KEY (id),
    FOREIGN KEY (iduser) REFERENCES user(id),
    FOREIGN KEY (idcategory) REFERENCES category(id),
    FOREIGN KEY (idallergy) REFERENCES allergies(id),
    FOREIGN KEY (idbrand) REFERENCES brand(id)
);

CREATE TABLE stock (
    id INT NOT NULL AUTO_INCREMENT,
    idsupermarket int,
    idproduct int,
    available boolean,
	PRIMARY KEY (id),
    FOREIGN KEY (idsupermarket) REFERENCES supermarket(id),
    FOREIGN KEY (idproduct) REFERENCES product(id)
);

CREATE TABLE recipe (
    id INT NOT NULL AUTO_INCREMENT,
    idproduct int,
    iduser int,
    title varchar(64),
    description text,
    likes int,
    time int,
    unit varchar(64),
    ammountofpeople int,
    image blob,
    image_url varchar(256),
	PRIMARY KEY (id),
    FOREIGN KEY (idproduct) REFERENCES product(id),
    FOREIGN KEY (iduser) REFERENCES user(id)
);

CREATE TABLE ingredients (
    id INT NOT NULL AUTO_INCREMENT,
    idproduct int,
    idrecipe int,
    quantity int,
    measurementunit VARCHAR (64),
    PRIMARY KEY (id),
    FOREIGN KEY (idproduct) REFERENCES product(id),
    FOREIGN KEY (idrecipe) REFERENCES recipe(id)
);

CREATE TABLE productallergies (
    id INT NOT NULL AUTO_INCREMENT,
    idproduct int,
    idallergies int,
	PRIMARY KEY (id),
    FOREIGN KEY (idproduct) REFERENCES product(id),
    FOREIGN KEY (idallergies) REFERENCES allergies(id)
);

CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT,
    iduser int,
    idproduct int,
    content varchar(64) ,
    likes int,
    idparent   int,
	PRIMARY KEY (id),
    FOREIGN KEY (iduser) REFERENCES user(id),
    FOREIGN KEY (idproduct) REFERENCES product(id),
    FOREIGN KEY (idparent) REFERENCES comment(id)
);

CREATE TABLE commentRecipe (
    id         int NOT NULL AUTO_INCREMENT        ,
    idusers    int         ,
    idrecipe   int         ,
    content    varchar(64) ,
    likes      int         ,
    idparent   int         ,
	    PRIMARY KEY (id),
        FOREIGN KEY (idusers) REFERENCES users(id),
        FOREIGN KEY (idrecipe) REFERENCES product(id),
        FOREIGN KEY (idparent) REFERENCES commentRecipe(id)
);
	
CREATE TABLE shoppinglist (
	id  INT NOT NULL AUTO_INCREMENT,
	creationdate DATE,
	idUser INT,
	   PRIMARY KEY (id),
      FOREIGN KEY (idUser) REFERENCES users(id)
);
	
CREATE TABLE productList (
	idShoppingList INT,
	idProduct INT,
	quantity INT,
		PRIMARY KEY (idShoppingList, idProduct),
      FOREIGN KEY (idShoppingList) REFERENCES shoppinglist(id),
      FOREIGN KEY (idProduct) REFERENCES product(id)
);
	
CREATE TABLE commentReport (
	id INT NOT NULL AUTO_INCREMENT,
	idUser INT,
   content    varchar(64) ,
   idComment INT,
		PRIMARY KEY (id),
      FOREIGN KEY (idUser) REFERENCES users(id),
      FOREIGN KEY (idComment) REFERENCES comment(id)
);
	
CREATE TABLE errorReport (
	id INT NOT NULL AUTO_INCREMENT,
	idProduct INT,
   content    varchar(64) ,
		PRIMARY KEY (id),
      FOREIGN KEY (idProduct) REFERENCES product(id)
);

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(64),
    password varchar(64),
    email varchar(255),
    role int,
    premium boolean,
	PRIMARY KEY (id)
);

insert into user values (1, 'admin', 'admin', 'admin@gmail.com', 1, TRUE);
insert into user values (2, 'pol', '1234', 'pol@gmail.com', 1, false);
insert into user values (3, 'ruben', '1234', 'ruben@gmail.com', 1, false);
insert into user values (4, 'alex', '1234', 'alex@gmail.com', 1, false);
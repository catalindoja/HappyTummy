CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(64),
    password varchar(64),
    email varchar(255),
    role int,
    premium boolean,
	PRIMARY KEY (id)
);

insert into user values (1, 'admin', 'admin', 'admin@gmail.com', 1, true);
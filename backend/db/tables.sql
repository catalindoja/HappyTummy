CREATE TABLE user (
    id int,
    username varchar(64),
    password varchar(64),
    email varchar(255),
    role int,
    premium boolean,
	PRIMARY KEY (id)
);

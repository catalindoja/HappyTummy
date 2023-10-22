INSERT INTO users VALUES (10,3,3,3,3,TRUE);
INSERT INTO users VALUES (11,4,4,4,4,TRUE);
INSERT INTO users VALUES (12,5,5,5,5,TRUE);

INSERT INTO PaymentHistory VALUES (10,10,3,CURRENT_DATE(),3);
INSERT INTO PaymentHistory VALUES (11,11,4,CURRENT_DATE(),4);
INSERT INTO PaymentHistory VALUES (12,12,5,CURRENT_DATE(),5);

INSERT INTO category VALUES (10, "carne fresca");
INSERT INTO category VALUES (11, "patatas");
INSERT INTO category VALUES (12, "almas de los inocentes");

INSERT INTO allergies VALUES (10, "lactosa", "bro tolerala y ya");
INSERT INTO allergies VALUES (11, "gluten", "pan");
INSERT INTO allergies VALUES (12, "marisco", "sobrevalorado");

INSERT INTO supermarket VALUES (10, "mercadona", "miedo", "address", "lleida", 3);
INSERT INTO supermarket VALUES (11, "lidl", "mas miedo", "address", "lleida", 3);
INSERT INTO supermarket VALUES (12, "carrefour", "frances :(", "address", "lleida", 3);

INSERT INTO product VALUES (10, 10, 10, 10, 3, "ramen", "gluten", "gallina blanca", "ta bueno", 3, 3, "image");
INSERT INTO product VALUES (11, 11, 11, 11, 4, "yogur", "lactosa", "danone", "donde estan los dinosaurios de danonino :'(", 4, 4, "image");
INSERT INTO product VALUES (12, 12, 12, 12, 5, "clorox", "nuts", "don limpio", ":)", 5, 5, "image");

INSERT INTO stock VALUES (10, 10, 10, TRUE);
INSERT INTO stock VALUES (11, 11, 11, TRUE);
INSERT INTO stock VALUES (12, 12, 12, TRUE);

INSERT INTO recipe VALUES (10, 10, 10, "galletas y sal", 3);
INSERT INTO recipe VALUES (11, 11, 11, "receta para el desastre", 4);
INSERT INTO recipe VALUES (12, 12, 12, "no c", 5);

INSERT INTO ingredients VALUES (10, 10, 10, 3, "kilos");
INSERT INTO ingredients VALUES (11, 11, 11, 4, "litros");
INSERT INTO ingredients VALUES (12, 12, 12, 5, "metros");

INSERT INTO productallergies VALUES (10, 10, 10);
INSERT INTO productallergies VALUES (11, 11, 11);
INSERT INTO productallergies VALUES (12, 12, 12);

INSERT INTO comment VALUES (10, 10, 10, "allo",3);
INSERT INTO comment VALUES (11, 11, 11, "olla",3);
INSERT INTO comment VALUES (12, 12, 12, "paella",3);

INSERT INTO discount VALUES (10, 10, 10, 3, CURRENT_DATE());
INSERT INTO discount VALUES (11, 11, 11, 4, CURRENT_DATE());
INSERT INTO discount VALUES (12, 12, 12, 5, CURRENT_DATE());
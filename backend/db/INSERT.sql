INSERT INTO supermarket VALUES (10, "mercadona", "miedo", "address", "lleida", 3, "image", "https://mercadona.es/web-display-img.png");
INSERT INTO supermarket VALUES (11, "lidl", "mas miedo", "address", "lleida", 3, "image", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/800px-Lidl-Logo.svg.png");
INSERT INTO supermarket VALUES (12, "carrefour", "frances :(", "address", "lleida", 3, "image", "https://cclasarenas.com/wp-content/uploads/2020/04/carrefour-las-arenas.jpg");

INSERT INTO user VALUES (10,10,"alex","1234","example1@gmail.com",1,TRUE, "image", "https://cdn.icon-icons.com/icons2/2574/PNG/512/profile_picture_user_icon_153847.png");
INSERT INTO user VALUES (11,11,"samer","1234","example1@gmail.com",2,TRUE, "image", "https://cdn.icon-icons.com/icons2/2574/PNG/512/profile_picture_user_icon_153847.png");
INSERT INTO user VALUES (12,12,"catalin","1234","example1@gmail.com",3,TRUE, "image", "https://cdn.icon-icons.com/icons2/2574/PNG/512/profile_picture_user_icon_153847.png");

INSERT INTO PaymentHistory VALUES (10,10,3,CURRENT_DATE(),3);
INSERT INTO PaymentHistory VALUES (11,11,4,CURRENT_DATE(),4);
INSERT INTO PaymentHistory VALUES (12,12,5,CURRENT_DATE(),5);

INSERT INTO category VALUES (10, "carne fresca", "image", "https://us.123rf.com/450wm/captainvector/captainvector1602/captainvector160264584/53052537-carne-cruda.jpg?ver=6");
INSERT INTO category VALUES (11, "vegetales", "image", "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fruit-and-vegetable-logo-design-template-614ae09920c8e6921f625ee6c93e64de_screen.jpg?ts=1671469104");
INSERT INTO category VALUES (12, "lacteos", "image", "https://static.vecteezy.com/system/resources/previews/009/727/225/non_2x/fresh-dairy-products-milk-cottage-cheese-yogurt-and-butter-logo-design-vector.jpg");

INSERT INTO allergies VALUES (10, "lactosa", "bro tolerala y ya");
INSERT INTO allergies VALUES (11, "gluten", "pan");
INSERT INTO allergies VALUES (12, "marisco", "sobrevalorado");

INSERT INTO brand VALUES(10, "hacendado", "image", "https://media.potatopro.com/hacendado-1200x589.jpg");
INSERT INTO brand VALUES(11, "gallina blanca", "image", "https://seeklogo.com/images/G/Gallina_Blanca-logo-4279C5344A-seeklogo.com.png");
INSERT INTO brand VALUES(12, "danone", "image", "https://www.danoneespana.es/content/dam/corp/local/esp/5_noticias/recursos/logotipos/01_danone.jpg");

INSERT INTO product VALUES (10, 10, 10, 10, 3, "ramen", 100, "gramos", 11, "ta bueno", 3, 3, "image", "https://cdn.freshful.ro/media/cache/sylius_shop_product_original/14/6f/7e9052f2ce7ab3e9de6da963c1c0.jpg");
INSERT INTO product VALUES (11, 11, 11, 11, 4, "yogur", 100, "gramos", 12, "donde estan los dinosaurios de danonino :'(", 4, 4, "image", "https://www.danonino.com.mx/wp-content/uploads/2022/04/danonino-fresa-1.png");
INSERT INTO product VALUES (12, 12, 12, 12, 5, "leche", 1, "litro", 10, ":)", 5, 5, "image", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/200px-Milk_glass.jpg");

INSERT INTO stock VALUES (10, 10, 10, TRUE);
INSERT INTO stock VALUES (11, 11, 11, TRUE);
INSERT INTO stock VALUES (12, 12, 12, TRUE);

INSERT INTO recipe VALUES (10, 10, 10, "galletas y sal", 3, 5, "minutos", 3, "image", "https://m.media-amazon.com/images/I/61mevxK7BSL.jpg");
INSERT INTO recipe VALUES (11, 11, 11, "patatas fritas", 4, 10, "minutos", 10, "image", "https://imag.bonviveur.com/presentacion-de-las-patatas-fritas-en-freidora-de-aire.jpg");
INSERT INTO recipe VALUES (12, 12, 12, "vegetales a la sarten", 5, 20, "minutos", 2, "image", "https://i.blogs.es/5163d7/como-hacer-verduras-salteadas-1-/1366_2000.jpg");

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
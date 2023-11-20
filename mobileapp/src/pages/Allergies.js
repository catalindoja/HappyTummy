import React from 'react';
import Gluten from "../img/gluten.png";
import Leche from "../img/leche.png";
import Huevo from "../img/huevo.png";
import Pescado from "../img/pescado.png";
import Cacahuetes from "../img/cacahuetos.png";
import Soja from "../img/soja.png";
import Frutossecas from "../img/frutassecas.png";
import Marisco from "../img/marisco.png";
import Moluscos from "../img/moluscos.png";
import Mostaza from "../img/mostaza.png";
import Apio from "../img/apio.png";
import Sulfitos from "../img/sulfitos.png";
import Sesamo from "../img/sesamo.png";
import Altramuces from "../img/altramuces.png";
import "./Allergies.css";
import { useTranslation } from 'react-i18next';

// Create the Allergies component
// This component displays the list of allergens that are identified in this service
function Allergies() {
    const { t } = useTranslation();
    return (
        <div className='container'>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"></link>

            <div className="allergies-intro">
                <h1 className="text-center text-danger">{t('allergens_info')} 🌾</h1>
                <p>{t('paragraph_allergens_info')} ❤</p>
                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Gluten} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>{t('gluten')}</h2>
                        <p>
                            {t('gluten_para')}
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Leche} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>{t('lactose')}</h2>
                        <p>
                            {t('lactose_para')}
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Huevo} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>{t('eggs')}</h2>
                        <p>
                            {t('eggs_para')}
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Pescado} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Fish</h2>
                        <p>
                            Fish is a type of seafood that comes from the water. It's a healthy source of protein and contains essential nutrients like omega-3 fatty acids, which are good for your heart and brain. Fish can be cooked in many ways, like grilling, baking, or frying, and it has a variety of flavors and textures, from mild to rich. It's a popular choice for delicious and nutritious meals.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Cacahuetes} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Peanuts</h2>
                        <p>
                            Peanuts are a type of nut that grows underground. They're a tasty and crunchy snack enjoyed by many people. Peanuts are often roasted and salted, but they can also be used in recipes like peanut butter, cookies, and candies. They're a good source of protein and healthy fats, making them a popular choice for snacking or adding flavor to various dishes.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Soja} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Soy</h2>
                        <p>
                            Soybeans, or simply "soy," are a type of legume. They are small, round beans and come in different varieties. Soy is used to make many food products like tofu, soy milk, and soy sauce. It's also an ingredient in various dishes and is known for being a source of plant-based protein. Soybeans are versatile and can be used in both savory and sweet dishes, making them a popular choice for vegetarian and vegan diets.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Marisco} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Seafood</h2>
                        <p>
                            Seafood refers to a variety of delicious foods that come from the sea. It includes fish and shellfish like shrimp, crabs, and clams. Seafood is known for its unique flavors and is often enjoyed in a wide range of dishes, from grilled fish to seafood pasta. It's a source of lean protein and can be a healthy part of your diet. Seafood is a popular choice for those who love the taste of the ocean.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Frutossecas} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Nuts</h2>
                        <p>
                            Nuts are small, edible snacks that come from plants, such as almonds, walnuts, peanuts, and hazelnuts. They have a distinctive flavor and a crunchy texture. Nuts are rich in protein, healthy fats, and other nutrients, and they can be eaten on their own as a snack or used in various recipes, such as cakes or salads. They are a popular choice for snacking and are valued for their taste and nutritional value.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Apio} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Celery</h2>
                        <p>
                            Celery is a type of vegetable known for its crisp texture and mild, fresh taste. It's often used in salads, soups, and as a crunchy snack. Celery is made up of long, green stalks with leaves at the top. It's low in calories and a good source of fiber. People enjoy its refreshing and slightly peppery flavor, making it a popular choice for adding crunch and freshness to various dishes.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Altramuces} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Lupins</h2>
                        <p>
                            Lupins or lupine beans in English refer to a type of legume that is often consumed in Mediterranean and Latin American cuisines. Lupins are small, round seeds typically found in a pod. They are often boiled or brined before eating, and they have a slightly nutty flavor. Lupins are enjoyed as a snack or as an ingredient in salads. They are a good source of plant-based protein and fiber, making them a nutritious addition to your diet.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Moluscos} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Molluscs</h2>
                        <p>
                            Molluscs refers to a group of animals with soft bodies and typically a hard shell. Molluscs include creatures like clams, snails, mussels, and octopuses. They come in various shapes and sizes. Some, like clams and mussels, are commonly used in seafood dishes. Molluscs are known for their diverse textures and flavors, ranging from tender to chewy. They are often featured in recipes like clam chowder and calamari, and they are appreciated for their taste and culinary versatility.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Mostaza} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Mustard</h2>
                        <p>
                            Mustard is a sauce or paste made from ground mustard seeds, vinegar, and spices. Mustard comes in different varieties, including yellow, brown, and Dijon. It has a tangy and slightly spicy taste. People often use it as a topping for hot dogs, sandwiches, or as an ingredient in salad dressings and marinades. Mustard adds flavor and a bit of zing to many dishes.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Sesamo} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Sesame</h2>
                        <p>
                            Sesame refers to the seeds of the sesame plant. These seeds are tiny and come in various colors, including white and black. Sesame seeds are often used as a topping for bread, buns, and crackers, and they can be found in various cuisines. They have a nutty flavor and a slightly crunchy texture. Sesame seeds are also used to make sesame oil, which is used in cooking and as a flavoring. These seeds add a unique taste and a bit of crunch to a variety of dishes.
                        </p>
                    </div>
                </div>

                <div className="allergies-container">
                    <hr />
                    <div className="allergies-icon">
                        <img src={Sulfitos} alt="Icono de alergia" />
                    </div>
                    <div className="allergies-content">
                        <h2>Sulphites</h2>
                        <p>
                            Sulfites are chemical substances used as additives in food and beverages. They are often added to preserve freshness and prevent food from spoiling. Sulfites can be found in products such as wines, dried fruits, juices, and canned goods. Some individuals may be sensitive or allergic to sulfites, which can cause adverse reactions. For this reason, foods containing sulfites are typically labeled to inform consumers of their presence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

// Export the Allergies component so that it can be used in other files.
export default Allergies;
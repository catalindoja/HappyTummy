import React, { useState } from 'react';
import Gluten from "../img/allergens/gluten.png";
import Leche from "../img/allergens/leche.png";
import Huevo from "../img/allergens/huevo.png";
import Pescado from "../img/allergens/pescado.png";
import Cacahuetes from "../img/allergens/cacahuetes.png";
import Soja from "../img/allergens/soja.png";
import Frutossecas from "../img/allergens/frutossecos.png";
import Marisco from "../img/allergens/marisco.png";
import Moluscos from "../img/allergens/moluscos.png";
import Mostaza from "../img/allergens/mostaza.png";
import Apio from "../img/allergens/apio.png";
import Sulfitos from "../img/allergens/sulfitos.png";
import Sesamo from "../img/allergens/sesamo.png";
import Altramuces from "../img/allergens/altramuces.png";
import "./Allergies.css";
import { useTranslation } from 'react-i18next';
import { Collapse } from 'react-bootstrap';
import { Accordion, Card, Button } from 'react-bootstrap';
import BackArrow from "../components/BackArrow";

// Allergies component
function Allergies() {
    const { t } = useTranslation();

    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);
    const [open8, setOpen8] = useState(false);
    const [open9, setOpen9] = useState(false);
    const [open10, setOpen10] = useState(false);
    const [open11, setOpen11] = useState(false);
    const [open12, setOpen12] = useState(false);
    const [open13, setOpen13] = useState(false);
    const [open14, setOpen14] = useState(false);

    return (
        <div className="allergies-page">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"></link>

            <BackArrow />

            <h1 className="allergies-title">{t('allergens_info')} 🌾</h1>
            {/* <p className="allergies-text">{t('paragraph_allergens_info')}</p> */}

            <div>
                <Button
                    onClick={() => setOpen1(!open1)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open1}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Gluten} alt="Icono de alergia" />
                            <h2 className="allergies-name" >{t('gluten')}</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open1}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                {t('gluten_para')}
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen2(!open2)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open2}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Leche} alt="Icono de alergia" />
                            <h2 className="allergies-name" >{t('lactose')}</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open2}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                {t('lactose_para')}
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen3(!open3)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open3}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Huevo} alt="Icono de alergia" />
                            <h2 className="allergies-name" >{t('eggs')}</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open3}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                {t('eggs_para')}
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen4(!open4)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open4}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Pescado} alt="Icono de alergia" />
                            <h2 className="allergies-name" >Fish</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open4}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Fish is a type of seafood that comes from the water. It's a healthy source of protein and contains essential nutrients like omega-3 fatty acids, which are good for your heart and brain. Fish can be cooked in many ways, like grilling, baking, or frying, and it has a variety of flavors and textures, from mild to rich. It's a popular choice for delicious and nutritious meals.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen5(!open5)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open5}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Cacahuetes} alt="Icono de alergia" />
                            <h2 className="allergies-name" >Peanuts</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open5}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Peanuts are a type of nut that grows underground. They're a tasty and crunchy snack enjoyed by many people. Peanuts are often roasted and salted, but they can also be used in recipes like peanut butter, cookies, and candies. They're a good source of protein and healthy fats, making them a popular choice for snacking or adding flavor to various dishes.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen6(!open6)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open6}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Soja} alt="Icono de alergia" />
                            <h2 className="allergies-name">Soy</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open6}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Soybeans, or simply "soy," are a type of legume. They are small, round beans and come in different varieties. Soy is used to make many food products like tofu, soy milk, and soy sauce. It's also an ingredient in various dishes and is known for being a source of plant-based protein. Soybeans are versatile and can be used in both savory and sweet dishes, making them a popular choice for vegetarian and vegan diets.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen7(!open7)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open7}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Marisco} alt="Icono de alergia" />
                            <h2 className="allergies-name">Seafood</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open7}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Seafood refers to a variety of delicious foods that come from the sea. It includes fish and shellfish like shrimp, crabs, and clams. Seafood is known for its unique flavors and is often enjoyed in a wide range of dishes, from grilled fish to seafood pasta. It's a source of lean protein and can be a healthy part of your diet. Seafood is a popular choice for those who love the taste of the ocean.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen8(!open8)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open8}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Frutossecas} alt="Icono de alergia" />
                            <h2 className="allergies-name">Nuts</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open8}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Nuts are small, edible snacks that come from plants, such as almonds, walnuts, peanuts, and hazelnuts. They have a distinctive flavor and a crunchy texture. Nuts are rich in protein, healthy fats, and other nutrients, and they can be eaten on their own as a snack or used in various recipes, such as cakes or salads. They are a popular choice for snacking and are valued for their taste and nutritional value.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen9(!open9)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open9}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Apio} alt="Icono de alergia" />
                            <h2 className="allergies-name">Celery</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open9}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Celery is a type of vegetable known for its crisp texture and mild, fresh taste. It's often used in salads, soups, and as a crunchy snack. Celery is made up of long, green stalks with leaves at the top. It's low in calories and a good source of fiber. People enjoy its refreshing and slightly peppery flavor, making it a popular choice for adding crunch and freshness to various dishes.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen10(!open10)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open10}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Altramuces} alt="Icono de alergia" />
                            <h2 className="allergies-name">Lupins</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open10}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Lupins or lupine beans in English refer to a type of legume that is often consumed in Mediterranean and Latin American cuisines. Lupins are small, round seeds typically found in a pod. They are often boiled or brined before eating, and they have a slightly nutty flavor. Lupins are enjoyed as a snack or as an ingredient in salads. They are a good source of plant-based protein and fiber, making them a nutritious addition to your diet.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen11(!open11)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open11}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Moluscos} alt="Icono de alergia" />
                            <h2 className="allergies-name">Molluscs</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open11}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Molluscs refers to a group of animals with soft bodies and typically a hard shell. Molluscs include creatures like clams, snails, mussels, and octopuses. They come in various shapes and sizes. Some, like clams and mussels, are commonly used in seafood dishes. Molluscs are known for their diverse textures and flavors, ranging from tender to chewy. They are often featured in recipes like clam chowder and calamari, and they are appreciated for their taste and culinary versatility.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen12(!open12)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open12}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Mostaza} alt="Icono de alergia" />
                            <h2 className="allergies-name">Mustard</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open12}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Mustard is a sauce or paste made from ground mustard seeds, vinegar, and spices. Mustard comes in different varieties, including yellow, brown, and Dijon. It has a tangy and slightly spicy taste. People often use it as a topping for hot dogs, sandwiches, or as an ingredient in salad dressings and marinades. Mustard adds flavor and a bit of zing to many dishes.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen13(!open13)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open13}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Sesamo} alt="Icono de alergia" />
                            <h2 className="allergies-name">Sesame</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open13}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Sesame refers to the seeds of the sesame plant. These seeds are tiny and come in various colors, including white and black. Sesame seeds are often used as a topping for bread, buns, and crackers, and they can be found in various cuisines. They have a nutty flavor and a slightly crunchy texture. Sesame seeds are also used to make sesame oil, which is used in cooking and as a flavoring. These seeds add a unique taste and a bit of crunch to a variety of dishes.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div>
                <Button
                    onClick={() => setOpen14(!open14)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open14}
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Sulfitos} alt="Icono de alergia" />
                            <h2 className="allergies-name">Sulphites</h2>
                        </div>
                    }
                </Button>
                <Collapse in={open14}>
                    <div id="example-collapse-text">
                        <div className="allergies-content">
                            <p>
                                Sulfites are chemical substances used as additives in food and beverages. They are often added to preserve freshness and prevent food from spoiling. Sulfites can be found in products such as wines, dried fruits, juices, and canned goods. Some individuals may be sensitive or allergic to sulfites, which can cause adverse reactions. For this reason, foods containing sulfites are typically labeled to inform consumers of their presence.
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>

        </div>

    );
}

// Exporting Allergies component
export default Allergies;
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
import { Accordion, Card, Button } from 'react-bootstrap';
import BackArrow from "../components/BackArrow";

// Allergies component
function Allergies() {
    const { t } = useTranslation();

    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <div className="allergies-page">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"></link>

            <BackArrow />

            <h1 className="allergies-title">{t('allergens_info')} 🌾</h1>
            {/* <p className="allergies-text">{t('paragraph_allergens_info')}</p> */}

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Gluten} alt="Icono de alergia" />
                            <h2 className="allergies-name" >{t('gluten')}</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Leche} alt="Icono de alergia" />
                            <h2 className="allergies-name" >{t('lactose')}</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Huevo} alt="Icono de alergia" />
                            <h2 className="allergies-name" >{t('eggs')}</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Pescado} alt="Icono de alergia" />
                            <h2 className="allergies-name" >Fish</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Cacahuetes} alt="Icono de alergia" />
                            <h2 className="allergies-name" >Peanuts</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Soja} alt="Icono de alergia" />
                            <h2 className="allergies-name">Soy</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Marisco} alt="Icono de alergia" />
                            <h2 className="allergies-name">Seafood</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Frutossecas} alt="Icono de alergia" />
                            <h2 className="allergies-name">Nuts</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Apio} alt="Icono de alergia" />
                            <h2 className="allergies-name">Celery</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Altramuces} alt="Icono de alergia" />
                            <h2 className="allergies-name">Lupins</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Moluscos} alt="Icono de alergia" />
                            <h2 className="allergies-name">Molluscs</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Mostaza} alt="Icono de alergia" />
                            <h2 className="allergies-name">Mustard</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Sesamo} alt="Icono de alergia" />
                            <h2 className="allergies-name">Sesame</h2>
                        </div>
                    }
                </Button>
            </div>

            <div>
                <Button
                    aria-controls="example-collapse-text"
                    className="allergies-bigbutton">
                    {
                        <div className='allergies-header'>
                            <img className="allergies-icon" src={Sulfitos} alt="Icono de alergia" />
                            <h2 className="allergies-name">Sulphites</h2>
                        </div>
                    }
                </Button>
            </div>

        </div>

    );
}

// Exporting Allergies component
export default Allergies;
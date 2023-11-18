import React from "react";
import Homeimage from "../img/homeimage.jpg";
import Logo from "../img/logo.png";
import FoodContent from "../img/foodcontent.jpeg";
import { useTranslation } from 'react-i18next';
import i18n from "../components/i18n";
import Configration from "../components/Configration";

const Home = () => {
    const { t } = useTranslation();
    return (
        <div className="Welcome">
            <Configration />
            <h1 className="title1 mb-3">{t('greeting')}</h1>
            <img src={Homeimage} alt="Home Image" className="img-fluid" />
            
            <div className="container">
                <div className="d-flex p-2 bd-highlight">
                    {t('paragraph_home1')}
                </div>
                <div className="d-flex p-2 bd-highlight">
                    <img src={FoodContent} alt="Food Content" className="img-fluid" />
                </div>
            </div>
        </div>

        
       
    )
};

export default Home;
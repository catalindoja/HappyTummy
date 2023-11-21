import React from "react";
import Teal from "../img/teal.png";
import './Home.css';
import backgroundImage from "../img/clearbackground.png";
import Card from "../components/ProductCard";
import { useTranslation } from 'react-i18next';
import i18n from "../components/i18n";
import axios from "axios";
import { BACKEND_API_URL } from '../config/proxy.js';
import Imagehome1 from "../img/imagehome1.jpeg";
import Imagehome2 from "../img/imagehome2.jpeg";
import Imagehome3 from "../img/imagehome3.jpeg";
import Imagehome4 from "../img/imagehome4.jpeg";
import Imagehome5 from "../img/imagehome5.jpeg";
import Imagehome6 from "../img/imagehome6.jpeg";

function Home() {
    const { t } = useTranslation();
    const cardsinfo = [
        {
        },
    ];

    return (
        <div className="home_content">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"></link>

            <h5 className="maintitles mb-4">{t('recommended')} <span className="text-danger heart">♥</span></h5>

            <div className="products" >
                <div>
                    <img className="img1" src={Imagehome1} />
                    <img className="img1" src={Imagehome2} />
                    <img className="img1"  src={Imagehome3} />
                </div>      
            </div>
            <h5 className="maintitles my-4">{t('recipes')}<span className="text-danger heart">♥</span></h5>
            <div>
                <img className="img1" src={Imagehome4} />
                <img className="img1" src={Imagehome5} />
                <img className="img1" src={Imagehome6} />
            </div>
        </div>
    );
}

export default Home;

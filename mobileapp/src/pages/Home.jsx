import React, { useState, useEffect, useContext } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import Imagehome1 from "../img/imagehome1.jpeg";
import Imagehome2 from "../img/imagehome2.jpeg";
import Imagehome3 from "../img/imagehome3.jpeg";
import Imagehome4 from "../img/imagehome4.jpeg";
import Imagehome5 from "../img/imagehome5.jpeg";
import Imagehome6 from "../img/imagehome6.jpeg";
import './Home.css';
import backgroundImage from "../img/clearbackground.png";
import Logo from "../img/logo2.png";
import Card from "../components/ProductCard";
import { AuthContext } from "../context/authContext";

const localImages = [
    require("../img/imagehome1.jpeg"),
    require('../img/imagehome2.jpeg'),
];

function Home() {
    // Obtaining the current user
    const { currentUser } = useContext(AuthContext);

    const { t } = useTranslation();

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="home_content">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"></link>

            <div className="home-header">
                <img className="home-header-logo" src={Logo} alt="logo" />
                <h2 className="home-header-text">Welcome {currentUser.username}!</h2>
            </div>

            <div className="home-products">
                <h5 className="maintitles">{t('recommended')}</h5>
                <Slider {...sliderSettings}>
                    <div>
                        <img className="img1" src={Imagehome1} alt="Product" />
                    </div>
                    <div>
                        <img className="img1" src={Imagehome2} alt="Product" />
                    </div>
                    <div>
                        <img className="img1" src={Imagehome3} alt="Product" />
                    </div>
                </Slider>
            </div>

            <div className="home-recipes">
                <h5 className="maintitles">{t('recipes')}</h5>
                <Slider {...sliderSettings}>
                    <div>
                        <img className="img1" src={Imagehome4} alt="Product" />
                    </div>
                    <div>
                        <img className="img1" src={Imagehome5} alt="Product" />
                    </div>
                    <div>
                        <img className="img1" src={Imagehome6} alt="Product" />
                    </div>
                </Slider>
            </div>

        </div >
    );
}
export default Home;

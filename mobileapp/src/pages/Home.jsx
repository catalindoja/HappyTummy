import React from "react";
import Teal from "../img/teal.png";
import './Home.css';
import backgroundImage from "../img/clearbackground.png";
import Card from "../components/ProductCard";
import { useTranslation } from 'react-i18next';
import i18n from "../components/i18n";
import axios from "axios";
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
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>

            <h4 className="maintitles mb-4">Recommended products <span className="text-danger">♥</span></h4>

            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={Imagehome1} alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={Imagehome2} alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={Imagehome3} alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            <h4 className="maintitles my-4">Recipes just for you <span className="text-danger">♥</span></h4>

            <div className="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={Imagehome4} alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={Imagehome5} alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={Imagehome6} alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            <h4 className="maintitles my-4">New posts <span className="text-danger">✨</span></h4>
            <div>
                <div className="card-container">
                    {cardsinfo.map(card => (
                        <Card
                            image={card.image}
                            alt={card.alt}
                            title={card.title}
                            text={card.text}
                            link={card.link}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Home;

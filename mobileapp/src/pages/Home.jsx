import React from "react";
import Homeimage from "../img/homeimage.jpg";
import Logo from "../img/logo.png";
import FoodContent from "../img/foodcontent.jpeg";
import Card from "../components/ProductCard";
import { Link } from "react-router-dom";

const cardsinfo = [
    {
        "title": "Huevos Rancheros",
        "text": "Huevos Rancheros de los buenos papi",
        "image": "https://galleria.riza.it/files/article/nelle-uova-una-miniera-di-sostanze-utili.jpg",
        "alt": "Huevos Rancheros papa",
        "link": "/huevosrancheros"
    },
    {
        "title": "Salchicha",
        "text": "Salchias de las buenas papi",
        "image": "https://cdn02.plentymarkets.com/xlzn8fmweulj/item/images/5240/full/5240-Wiener-Wuerstchen-Lebensmittel-Attrappe-15-cm-Wiener-Wuerstchen-Lebensmittel-Attrappe-52039300.png",
        "alt": "Salchichas papa",
        "link": "/salchichas"
    }
];

const Home = () => {
    return (
        <div className="container Welcome">
                <h1 className="title1">Welcome To Happy Tummy</h1>
            <img src={Homeimage} alt="Home Image" className="img-fluid" />
            
            <div className="container">
                <div className="d-flex p-4 bd-highlight">
                    Discover Your Food Allergies
                    Explore a world of culinary knowledge and uncover potential allergens.
                    Our platform provides insights into foods and their associated allergies,
                    helping you make informed
                    choices for a healthier, safer dining experience.
                </div>
                <div className="d-flex p-4 bd-highlight">
                    <img src={FoodContent} alt="Food Content" className="img-fluid" />
                </div>
            </div>

            <div>
                <h2>Cards</h2>
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
            <div className="scanner">
                <Link to={"/scanner/"}>
                    <button>Scan product</button>
                </Link>
             </div>
        
        </div>  
    
    
       
    )
};

export default Home;
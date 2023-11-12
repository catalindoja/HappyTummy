import React from "react";
import Homeimage from "../img/homeimage.jpg";
import Logo from "../img/logo.png";
import FoodContent from "../img/foodcontent.jpeg";

const Home = () => {
    return (
        <div className="Welcome">
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
        </div>
    
        
       
    )
};

export default Home;
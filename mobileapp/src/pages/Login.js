import React from "react";
import Homeimage from "../img/homeimage.jpg";
import Logo from "../img/logo.png";
import FoodContent from "../img/foodcontent.jpeg";

const Login = () => {
    return (
        <div className="container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"></link>
            <h1 className="text-danger text-center my-5">Happy Tummy</h1>
            <img src={Homeimage} alt="Home Image" className="img-fluid" />

            <div className="container">
                <div className="d-flex p-2 bd-highlight">
                    Discover Your Food Allergies
                    Explore a world of culinary knowledge and uncover potential allergens.
                    Our platform provides insights into foods and their associated allergies,
                    helping you make informed
                    choices for a healthier, safer dining experience.
                </div>
                <div className="d-flex p-2 bd-highlight">
                    <img src={FoodContent} alt="Food Content" className="img-fluid" />
                </div>
            </div>
        </div>



    )
};

export default Login;
import React from "react";
import Homeimage from "../img/homeimage.jpg";
import Logo from "../img/logo.png";
import FoodContent from "../img/foodcontent.jpeg";

const Home = () => {
    return (
        <div className="Welcome">
                <h1 className="title1">Welcome To Happy Tummy</h1>
            <img src={Homeimage} alt="Home Image" className="image-style" />
            
            <div className="center1">
                <table>
                    <tr>
                        <td className="para">
                            Discover Your Food Allergies
                            Explore a world of culinary knowledge and uncover potential allergens.
                            Our platform provides insights into foods and their associated allergies,
                            helping you make informed
                            choices for a healthier, safer dining experience.
                        </td>
                        <td>
                            <img src={FoodContent} alt="Food Content" className="foodcontent" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        
       
    )
};

export default Home;
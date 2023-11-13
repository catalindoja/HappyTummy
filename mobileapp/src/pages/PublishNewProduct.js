import React, { useState } from "react";
import Nutella from "../img/nutella.jpeg";
import Milk from "../img/milk.jpeg";
import FoodContent from "../img/foodcontent.jpeg";
import "./PublishNewProduct.css";

const PublishNewProduct = () => {
    const [activeSection, setActiveSection] = useState("publishnewproduct");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="container">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            ></link>
            <div className="title1 text-center font-weight-bold my-3 text-success">
                <span
                    className={`mr-3 ${activeSection === "products" ? "text-decoration-underline" : ""
                        }`}
                    onClick={() => handleSectionChange("products")}
                >
                    Products
                </span>
                <span
                    className={`${activeSection === "recipes" ? "text-decoration-underline" : ""
                        }`}
                    onClick={() => handleSectionChange("recipes")}
                >
                    Recipes
                </span>
            </div>

            <div className="form_search my-3">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                </form>
            </div>

            <div className="container">
                <div className="d-flex p-2 bd-highlight">
                    {/* Contenido de recetas */}
                    Discover Your Food Allergies Explore a world of culinary knowledge
                    and uncover potential allergens. Our platform provides insights into
                    foods and their associated allergies, helping you make informed
                    choices for a healthier, safer dining experience.
                </div>
                <div className="d-flex p-2 bd-highlight">
                    <img
                        src={FoodContent}
                        alt="Food Content"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default PublishNewProduct;

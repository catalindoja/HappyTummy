import React, { useState } from "react";
import Nutella from "../img/nutella.jpeg";
import Milk from "../img/milk.jpeg";
import Homeimage from "../img/homeimage.jpg";
import FoodContent from "../img/foodcontent.jpeg";
import "./Products.css";

const Products = () => {
    const [activeSection, setActiveSection] = useState("products");

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

            {activeSection === "products" && (
                <div className="card_image my-5">
                    <div className="card-deck">
                        <div className="card">
                            <img src={Nutella} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Título de la Tarjeta 1</h5>
                                <p className="card-text">Descripción corta de la imagen 1.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={Milk} className="card-img-top" alt="Imagen 2" />
                            <div className="card-body">
                                <h5 className="card-title">Título de la Tarjeta 2</h5>
                                <p className="card-text">Descripción corta de la imagen 2.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeSection === "recipes" && (
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
                
            )}
            
            <div className="btn container-fluid d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <a href="https://www.google.com">
                        <button type="button" className="btn btn-success">
                            Publish a Product
                        </button>
                    </a>
                    
                </div>
            </div>

        </div>
    );
};

export default Products;

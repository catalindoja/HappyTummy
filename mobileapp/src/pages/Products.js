import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassWhiskey, faHatCowboy } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Nutella from "../img/nutella.jpeg";
import Milk from "../img/milk.jpeg";
import FoodContent from "../img/foodcontent.jpeg";
import PublishNewProduct from "./PublishNewProduct";
import "./Products.css";

const Products = () => {
    const [activeSection, setActiveSection] = useState("products");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const publishNewProduct = () => {
        return alert("Publish a new product");
    };

    const publishNewReceipe = () => {
        return alert("Publish a new receipe");
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
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                    />
                </form>
            </div>

            {activeSection === "products" && (
                <div className="card_image my-5">
                    <div className="card-deck">
                        <div className="card">
                            <img src={Nutella} className="card-img-top" alt="Product 1" />
                            <div className="card-body">
                                <h5 className="card-title">Product Title 1</h5>
                                <p className="card-text">Short description of Product 1.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={Milk} className="card-img-top" alt="Product 2" />
                            <div className="card-body">
                                <h5 className="card-title">Product Title 2</h5>
                                <p className="card-text">Short description of Product 2.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeSection === "recipes" && (
                <div className="container">
                    <div className="d-flex p-2 bd-highlight">
                        Discover Your Food Allergies Explore a world of culinary knowledge
                        and uncover potential allergens. Our platform provides insights into
                        foods and their associated allergies, helping you make informed
                        choices for a healthier, safer dining experience.
                    </div>
                    <div className="d-flex p-2 bd-highlight">
                        <img src={FoodContent} alt="Food Content" className="img-fluid" />
                    </div>
                </div>
            )}

            <div className="container-fluid d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <Popup
                        trigger={<button className="btn btn-success">Publish a Product</button>}
                        modal
                    >
                        {(close) => (
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title text-center">Publish a New Post</h5>
                                    <button className="close" onClick={close} style={{ border: 'none', fontWeight: 'bold', fontSize:'30px'}}>
                                        &times;
                                    </button>

                                </div>
                                <div className="modal-body">
                                    <PublishNewProduct />
                                </div>
                                <div className="modal-footer text-center justify-content-center">
                                    <button className="btn btn-success" onClick={publishNewProduct}>
                                        <FontAwesomeIcon icon={faGlassWhiskey} style={{ marginRight: '5px' }} />
                                        Product
                                    </button>

                                    <button className="btn btn-danger" onClick={publishNewReceipe}>
                                        Receipe
                                        <FontAwesomeIcon icon={faHatCowboy} style={{ marginLeft: '5px' }} />
                                    </button>
                                </div>
                            </>
                        )}
                    </Popup>
                </div>
            </div>
        </div>
    );
};

export default Products;

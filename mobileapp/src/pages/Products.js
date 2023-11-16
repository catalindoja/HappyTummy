import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassWhiskey, faHatCowboy } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Nutella from "../img/nutella.jpeg";
import Milk from "../img/milk.jpeg";
import PublishNewProduct from "./PublishNewProduct";
import "./Products.css";

const Products = () => {
    const [activeSection, setActiveSection] = useState("products");
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const publishNewProduct = () => {
        return alert("Publish a new product");
    };

    const publishNewRecipe = () => {
        return alert("Publish a new recipe");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/products");
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    // Filtrar productos según el término de búsqueda
    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
            </div>

            {activeSection === "products" && (
                <div className="card_image my-5">
                    <div className="card-deck">
                        {filteredProducts.map(product => (
                            <div className="card" key={product.id}>
                                <img src={product.image_url} className="card-img-top" alt={product.product_name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{product.product_description}</p>
                                </div>
                            </div>
                        ))}
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
                        <img src={Milk} alt="Food Content" className="img-fluid" />
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
                                    <button className="close" onClick={close} style={{ border: 'none', fontWeight: 'bold', fontSize: '30px' }}>
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
                                    <button className="btn btn-danger" onClick={publishNewRecipe}>
                                        Recipe
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

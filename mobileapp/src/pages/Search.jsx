import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import RecipeCard from "../components/RecipeCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import Scanner from "./Scanner";
import { BACKEND_API_URL } from '../config/proxy.js';

import './Search.css';

import { AuthContext } from "../context/authContext";

function Search() {

    // Obtaining the current user
    // const { currentUser } = useContext(AuthContext);

    // Obtain products
    let [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/products`);
                console.log(res.data);
                setProducts(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    // Filter products
    const [searchTermProduct, setSearchTermProduct] = useState("");
    let filteredProducts = products.filter((post) =>
        post.product_name.toLowerCase().includes(searchTermProduct.toLowerCase())
    );

    // Obtain recipes
    let [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/recipes`);
                console.log(res.data);
                setRecipes(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    // Filter recipes
    const [SearchTermRecipe, setSearchTermRecipe] = useState("");
    let filteredRecipes = recipes.filter((post) =>
        post.title.toLowerCase().includes(SearchTermRecipe.toLowerCase())
    );

    // Choose between products and recipes
    const [activeSection, setActiveSection] = useState("products");

    return (
        <div className="searchcontent"> 
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>

            <div className="section-buttons">
                <button
                    className={activeSection === "products" ? "active" : ""}
                    onClick={() => setActiveSection("products")}
                >
                    Products
                </button>
                <button
                    className={activeSection === "recipes" ? "active" : ""}
                    onClick={() => setActiveSection("recipes")}
                >
                    Recipes
                </button>
            </div>

            {activeSection === "products" && (
            <div className="searchproduct">
                    <div className="boxes">
                        <fieldset className="search-fieldset">
                            <input
                                type="text"
                                className="search"
                                value={searchTermProduct}
                                placeholder="What are you looking for?"
                                onChange={(e) => setSearchTermProduct(e.target.value)}
                            />
                        </fieldset>
                        <Link to="/app/scanner">
                            <FontAwesomeIcon icon={faBarcode} className="barcode-icon" />
                        </Link>
                        
                    </div>

                {filteredProducts.length === 0 ? (
                    <h3>Sorry, there are no products matching your search 😕</h3>
                ) : (
                    <div>
                        <div className="card-container">
                            {filteredProducts.map(post => (
                                <ProductCard
                                    image={post.image_url}
                                    title={post.product_name}
                                    desc={post.product_description}
                                    id={post.id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            )}

            {activeSection === "recipes" && (
            <div className="searchrecipe">
                <div className="boxes">
                    <fieldset>
                        <input
                            type="text"
                            className="search"
                            value={SearchTermRecipe}
                            placeholder="What are you looking for?"
                            onChange={(e) => setSearchTermRecipe(e.target.value)}
                        />
                    </fieldset>
                </div>

                {filteredRecipes.length === 0 ? (
                    <h3>Sorry, there are no recipes matching your search 😕</h3>
                ) : (
                    <div>
                        <div className="card-container">
                            {filteredRecipes.map(post => (
                                <RecipeCard
                                    image={post.image_url}
                                    title={post.title}
                                    desc={post.description}
                                    id={post.id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            )}
        
        
        </div>
    );

};

export default Search;




    // <div>
    //     search product here! 

    //     <div className="container-fluid d-flex align-items-center justify-content-center">
    //         <div className="text-center">
    //             <Popup
    //                 trigger={<button className="btn btn-success">Publish a Product</button>}
    //                 modal
    //             >
    //                 {(close) => (
    //                     <>
    //                         <div className="modal-header">
    //                             <h5 className="modal-title text-center">Publish a New Post</h5>
    //                             <button className="close" onClick={close} style={{ border: 'none', fontWeight: 'bold', fontSize: '30px' }}>
    //                                 &times;
    //                             </button>

    //                         </div>
    //                         <div className="modal-body">
    //                             <publishNewProduct />
    //                         </div>
    //                         <div className="modal-footer text-center justify-content-center">
    //                             <button className="btn btn-success" onClick={publishNewProduct}>
    //                                 Product
    //                             </button>

    //                             <button className="btn btn-danger" onClick={publishNewProduct}>
    //                                 Receipe
    //                             </button> 
    //                         </div>
    //                     </>
    //                 )}
    //             </Popup>
    //         </div>
    //     </div>
    // </div>
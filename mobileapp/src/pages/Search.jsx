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
import ReactPaginate from "react-paginate";
import backgroundImage from "../img/clearbackground.png";
import "reactjs-popup/dist/index.css";
import UserCard from "../components/UserCard";
import community from "../img/community.png";

function Search() {

    // Obtaining the current user
    const { currentUser } = useContext(AuthContext);

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

    // Obtain users
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/users`);
                console.log(res.data);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    // Filter users
    const [SearchTermUser, setSearchTermUser] = useState("");
    let filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(SearchTermUser.toLowerCase())
    );

    // Choose between products, recipes and users
    const [activeSection, setActiveSection] = useState("products");

    // Product pagination
    const [pageNumberProduct, setPageNumberProduct] = useState(0);
    const postsPerPageProduct = 4;
    const pageCountProduct = Math.ceil(products.length / postsPerPageProduct);
    const changePage = ({ selected }) => {
        setPageNumberProduct(selected);
    };

    return (
        // style={{ backgroundImage: `url(${backgroundImage})` }}s
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
                <button
                    className={`image-button ${activeSection === "users" ? "active" : ""}`}
                    onClick={() => setActiveSection("users")}
                >
                    <img
                        src={community}
                        alt="Community"
                        style={{ width: '35px', height: '25px', color: 'w' }}
                    />
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
                        <h3 className="sorry-text">Sorry, there are no products matching your search 😕</h3>
                    ) : (
                        <div>
                            <div className="card-container">
                                {filteredProducts
                                    // .slice(pageNumberProduct * postsPerPageProduct, (pageNumberProduct + 1) * postsPerPageProduct)
                                    .map(post => (
                                        <ProductCard
                                            image={post.image_url}
                                            title={post.product_name}
                                            desc={post.product_description}
                                            id={post.id}
                                            likes={post.likes}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCountProduct}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"previous"}
                        nextLinkClassName={"next"}
                        disabledClassName={"disabled"}
                        activeClassName={"active"}
                    /> */}

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
                        <h3 className="sorry-text">Sorry, there are no recipes matching your search 😕</h3>
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

            {activeSection === "users" && (
                <div className="userlist">

                    <div className="boxes">
                        <fieldset>
                            <input
                                type="text"
                                className="search"
                                value={SearchTermUser}
                                placeholder="Who are you looking for?"
                                onChange={(e) => setSearchTermUser(e.target.value)}
                            />
                        </fieldset>
                    </div>

                    {filteredUsers.length === 0 ? (
                        <h3 className="sorry-text">Sorry, there are no usernames matching your search 😕</h3>
                    ) : (
                        <div>
                            <div className="">
                                {filteredUsers.map(user => (
                                    <UserCard
                                        key={user.id}
                                        user={user} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    );

};

// Exporting the component
export default Search;

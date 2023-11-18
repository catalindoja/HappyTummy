import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassWhiskey, faHatCowboy, faTimes, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Nutella from "../img/nutella.jpeg";
import Milk from "../img/milk.jpeg"; // Asegúrate de tener esta importación
import PublishNewProduct from "./PublishNewProduct";
import "./Products.css";

const Products = () => {
    const [activeSection, setActiveSection] = useState("products");
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editedProduct, setEditedProduct] = useState({
        id: null,
        product_name: "",
        product_description: "",
        image_url: "",
    });

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const publishNewProduct = () => {
        return alert("Publish a new product");
    };

    const publishNewRecipe = () => {
        return alert("Publish a new recipe");
    };

    const deleteProduct = async (productId) => {
        console.log(productId);
        try {
            console.log(productId);
            // Obtener la información del producto antes de eliminarlo
            const deletedProduct = products.find(product => product.id === productId);
            console.log(products);
            console.log(deletedProduct.product_name);
            console.log(deletedProduct.product_description);
            console.log(deletedProduct.image_url);
            // Eliminar el producto
            //alert("h");
            await axios.delete(`/products/${productId}`);
            
            // Actualizar la interfaz de usuario eliminando el producto de la lista
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const editProduct = (product) => {
        setEditedProduct({
            id: product.id,
            product_name: product.product_name,
            product_description: product.product_description,
            image_url: product.image_url,
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target.value;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const saveChanges = async () => {
        try {
            if (!editedProduct.id) {
                console.error("No product selected for editing");
                return;
            }

            await axios.put(`/products/${editedProduct.id}`, {
                product_name: editedProduct.product_name,
                product_description: editedProduct.product_description,
                image_url: editedProduct.image_url,
            });

            setEditedProduct({
                id: null,
                product_name: "",
                product_description: "",
                image_url: "",
            });
        } catch (error) {
            console.error("Error saving changes:", error);
        }
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

            {/* Botones de búsqueda con icono de borrar */}
            <div className="form_search my-3">
                <div className="input-group">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Enter search term"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Icono de borrar */}
                    <div className="input-group-append">
                        <span
                            className="input-group-text"
                            onClick={() => setSearchTerm("")}
                            style={{ cursor: "pointer" }}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </div>
                </div>
            </div>

            {activeSection === "products" && (
                <div className="card_image my-5">
                    <div className="card-deck">
                        {filteredProducts.map((product) => (
                            <div className="card" key={product.id}>
                                <img src={product.image_url} className="card-img-top" alt={product.product_name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{product.product_description}</p>
                                </div>
                                {/* Botón de borrar a la derecha */}
                                <button
                                    className="btn btn-danger"
                                    style={{ position: "absolute", top: "0", right: "0", margin: "8px" }}
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                {/* Botón de editar a la izquierda */}
                                <button
                                    className="btn btn-primary"
                                    style={{ position: "absolute", top: "0", left: "0", margin: "8px" }}
                                    onClick={() => editProduct(product)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
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
                                    <button className="btn btn-success">
                                        <Link to="/publish-new-product">
                                            <FontAwesomeIcon icon={faGlassWhiskey} style={{ marginRight: '5px' }} />
                                            Product
                                        </Link>
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

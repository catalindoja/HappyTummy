import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from 'react-bootstrap'; // Adjust the import based on your UI library
import "./PostProduct.css";

const EditProduct = () => {
    const location = useLocation();
    const state = location.state || {};

    const { t } = useTranslation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[3];

    const [productData, setProductData] = useState({
        product_name: "",
        product_description: "",
        // Add other fields as needed
    });

    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [selectedSupermarkets, setSelectedSupermarkets] = useState([]);
    const [file, setFile] = useState(null);
    const [product_name, setProductName] = useState(state?.product_name || "");
    const [product_description, setProductDescription] = useState(state?.product_description || "");
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null); // Placeholder for error

    const hidePopup = () => {
        setShowPopup(false);
    };

    const handleInputChange = (field, value) => {
        setProductData((prevProductData) => ({
            ...prevProductData,
            [field]: value,
        }));
    };

    // Obtains the list of allergies from the backend
    const [allergies, setAllergies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/allergies`);
                //console.log(res.data)
                setAllergies(res.data);
            } catch (err) {
                //console.log(err);
            }
        };
        fetchData();
    }, []);

    // Function to handle the toggle of the checkboxes
    const handleAllergyToggle = (allergyId) => {
        if (selectedAllergies.includes(allergyId)) {
            setSelectedAllergies(selectedAllergies.filter((id) => id !== allergyId));
        } else {
            setSelectedAllergies([...selectedAllergies, allergyId]);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            // Patch
            await axios.patch(`/products/${postId}`, {
                product_name: productData.product_name,
                product_description: productData.product_description,
            });
            const productId = postId;
            await Promise.all(selectedAllergies.map(async (idallergies) => {
                await axios.post(`/productallergies/`, {
                    idallergies: idallergies,
                    idproduct: productId
                });
            }));

            alert("Product updated successfully");
            hidePopup();
            navigate(`/app/products/${postId}`);
        } catch (err) {
            console.log(err);
        }
    };


    const fetchProductDataFromServer = async () => {
        try {
            console.log("postId:", postId);
            const response = await axios.get(`/products/${postId}`);
            const productData = response.data;
            setProductData(productData);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        fetchProductDataFromServer();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/products/${postId}`, {
                product_name: productData.product_name,
                product_description: productData.product_description,
                // Add other fields as needed
            });
            alert("Product updated successfully");
            navigate(`/app/products/${postId}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className="supertitle-write">{t('edit_product')} <span className="text-danger">❤</span></h2>
            <div className="add-write">
                <div className="content-write">
                    <input
                        type="text"
                        placeholder={t('name_product')}
                        value={productData.product_name}
                        onChange={(e) => handleInputChange("product_name", e.target.value)}
                    />

                    <div className="editorContainer-write">
                        <ReactQuill
                            placeholder={t('product_description')}
                            className="editor-write"
                            theme="snow"
                            value={productData.product_description}
                            onChange={(value) => handleInputChange("product_description", value)}
                        />
                    </div>

                    <div className="boxes-write my-3">
                        <fieldset>
                            <legend>{t('allergies')}</legend>
                            <span>{t('it_contains')}</span>
                            {allergies.map((allergy) => (
                                <div key={allergy.id}>
                                    <input type="checkbox" id={allergy.allergy_name} name="alergies[]"
                                        checked={selectedAllergies.includes(allergy.id)}
                                        onChange={() => handleAllergyToggle(allergy.id)}
                                        className="custom-checkbox-write" />
                                    <label htmlFor={allergy.allergy_name}>{allergy.allergy_name}</label>
                                </div>
                            ))}
                        </fieldset>
                    </div>

                    {error && <p className="error-message-write">{error}</p>}
                    <div className="buttons-write-recipe">
                        <button onClick={() => setShowPopup(true)}>Update</button>
                    </div>

                    <Modal show={showPopup} onHide={hidePopup} centered animation="slide-up">
                        <Modal.Header closeButton>
                            <h4
                                style={{
                                    marginBottom: "-10px",
                                    marginLeft: "30px",
                                    marginTop: "10px",
                                    textAlign: "center",
                                    fontSize: "30px",
                                }}
                                classname="post-popup-text"
                            >
                                Confirm Update
                            </h4>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-around">
                                <Button
                                    style={{
                                        padding: "15px 15px",
                                        fontSize: "20px",
                                        backgroundColor: "teal",
                                        color: "white",
                                        border: "none",
                                    }}
                                    variant="primary"
                                    onClick={handleClick}
                                >
                                    OK
                                </Button>
                                <Button className="cancel"
                                    style={{
                                        padding: "15px 15px",
                                        fontSize: "20px",
                                        backgroundColor: "lightgray",
                                        color: "white",
                                        border: "none",
                                    }}
                                    variant=""
                                    onClick={hidePopup}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </div>
    );
};

export default EditProduct;
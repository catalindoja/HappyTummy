import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap'; // Adjust the import based on your UI library
import "./PostProduct.css";

const EditProduct = () => {
    const location = useLocation();
    const state = location.state || {};

    const { t } = useTranslation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];

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
    const [price, setPrice] = useState(state?.price || "");
    const [measurement, setSelectedMeasurement] = useState(state?.measurement || "");
    const [quantity, setQuantity] = useState(state?.quantity || "");
    const [supermarkets, setSupermarkets] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/markets`);
          setSupermarkets(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
    const [brands, setBrands] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/brands`);
          console.log(res.data)
          setBrands(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
    const [idbrand, setidbrand] = useState(state?.idbrand || "");
    const [idcategory, setidcategory] = useState(state?.idcategory || "");
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/categories`);
          console.log(res.data)
          setCategories(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
    const [combinedBarcode, setCombinedBarcode] = useState(state?.barcode || "");
    const handleBarcodeChange = (e) => {
      const { name, value } = e.target;
      if (name === "part1") {
        const combined = `${value}${combinedBarcode.substring(1, 7)}${combinedBarcode.substring(8, 14)}`;
        setCombinedBarcode(combined);
      } else if (name === "part2") {
        const combined = `${combinedBarcode.substring(0, 1)}${value}${combinedBarcode.substring(8, 14)}`;
        setCombinedBarcode(combined);
      } else if (name === "part3") {
        const combined = `${combinedBarcode.substring(0, 7)}${value}`;
        setCombinedBarcode(combined);
      }
    };

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
    const handleSupermarketToggle = (supermarketId) => {
      if (selectedSupermarkets.includes(supermarketId)) {
          setSelectedSupermarkets(selectedSupermarkets.filter((id) => id !== supermarketId));
      } else {
          setSelectedSupermarkets([...selectedSupermarkets, supermarketId]);
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
            navigate(`/products/${postId}`);
        } catch (err) {
            console.log(err);
        }
    };


    const fetchProductDataFromServer = async () => {
        try {
            const response = await axios.get(`/products/${postId}`);
            const productData = response.data;
            console.log("Quantity:", productData.quantity);
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
            navigate(`/products/${postId}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className="supertitle-write">{t('Edit Product')} <span className="text-danger">❤</span></h2>
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
  
                    <input
                        type="number"
                        placeholder={t('price')}
                        value={productData.price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="measurement-container-write">
                    <div className="quantity-input-write">
                      <input
                        type="number"
                        placeholder={t("quantity")}
                        value={productData.quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="measurement-input-write">
                      <select
                        value={productData.measurement}
                        onChange={(e) => setSelectedMeasurement(e.target.value)}
                      >
                        <option value="">{t('unit')}</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="mg">mg</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="unidad">{t('unit')}</option>
                      </select>
                    </div>
                  </div>
  
                    <div className="super-bar-code-write">
                        <h3>{t('Barcode')}</h3>
                    </div>
  
                    <div className="super-bar-code-write">
                        <input
                        type="text"
                        pattern="[0-9]"
                        name="part1"
                        placeholder="X"
                        maxLength="1"
                        value={(''+productData.barcode).substr(0, 1)}
                        />
            
                        <input
                        type="text"
                        pattern="[0-9]"
                        name="part2"
                        placeholder="X X X X X X"
                        maxLength="6"
                        value={(''+productData.barcode).substr(1, 6)}
                        onChange={handleBarcodeChange}
                        />
            
                        <input
                        type="text"
                        pattern="[0-9]"
                        name="part3"
                        placeholder="X X X X X X"
                        maxLength="6"
                        value={(''+productData.barcode).substr(7, 6)}
                        onChange={handleBarcodeChange}
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

                    <div className="boxes-write">
                    <fieldset>
                        <legend>{t('supermarkets')}</legend>
                        <span>{t('found')}</span>
                        {supermarkets.map((market) => (
                        <div key={market.id}>
                            <input type="checkbox" id={market.name} name="markets[]"
                            checked={selectedSupermarkets.includes(market.id)}
                            onChange={() => handleSupermarketToggle(market.id)}
                            className="custom-checkbox-write" />
                            <label htmlFor={market.name}>{market.name}</label>
                        </div>
                        ))}
                    </fieldset>
                    </div>

                    <div className="boxes-write">
                    <fieldset>
                        <legend>{t('brand')}</legend>
                        {brands.map((brand) => (
                        <div key={brand.id}>
                            <input type="radio" id={brand.name} name="idbrand" value={brand.id} onChange={() => setidbrand(brand.id)} />
                            <label htmlFor={brand.name}>{brand.name}</label>
                        </div>
                        ))}
                    </fieldset>
                    </div>

                    <div className="boxes-write">
                    <fieldset>
                        <legend>{t('category')}</legend>
                        {categories.map((category) => (
                        <div key={category.id}>
                            <input type="radio" id={category.category_name} name="iccategory" value={category.id} onChange={() => setidcategory(category.id)} />
                            <label htmlFor={category.category_name}>{category.category_name}</label>
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
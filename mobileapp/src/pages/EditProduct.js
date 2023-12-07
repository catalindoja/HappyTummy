import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
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
    

    const handleInputChange = (field, value) => {
        setProductData((prevProductData) => ({
            ...prevProductData,
            [field]: value,
        }));
    };

    const fetchProductDataFromServer = async () => {
        try {
            //console.log("hello");
            console.log("postId:", postId);
            const response = await axios.get(`/products/${postId}`);
            const productData = response.data;
            setProductData(productData);
            //console.log(productData);
            //console.log(productData.product_name);
            //console.log(productData.product_description);
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

    // Obtains the list of brands from the backend
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/brands`);
                //console.log(res.data)
                setBrands(res.data);
            } catch (err) {
                //console.log(err);
            }
        };
        fetchData();
    }, []);

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

    // Obtains the list of categories from the backend
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/categories`);
                //console.log(res.data)
                setCategories(res.data);
            } catch (err) {
                //console.log(err);
            }
        };
        fetchData();
    }, []);

    // Obtains the list of categories from the backend
    const [supermarkets, setSupermarkets] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/markets`);
                setSupermarkets(res.data);
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

    // Function to handle the toggle of the checkboxes
    const handleSupermarketToggle = (supermarketId) => {
        if (selectedSupermarkets.includes(supermarketId)) {
            setSelectedSupermarkets(selectedSupermarkets.filter((id) => id !== supermarketId));
        } else {
            setSelectedSupermarkets([...selectedSupermarkets, supermarketId]);
        }
    };

    // Obtains the current user from the context
    const { currentUser } = useContext(AuthContext);
    const iduser = currentUser.id;

    // Bar code number combination
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

    // To upload the image
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    // Set up the state variables
    // - error: a string that represents the error message if the user does not fill in the input fields
    //          (default value is null)
    // - likes: a number that represents the number of likes of the product
    // - price: a number that represents the price of the product
    // - quantity: a number that represents the quantity per unit of the product
    // - idbrand: a number that represents the id of the brand of the product
    // - idcategory: a number that represents the id of the category of the product
    // - selectedAllergies: an array that represents the list of allergies of the product
    // - measurement: a string that represents the unit of measurement of the product
    // - image_url: a string that represents the image url of the product
    // - value: a string that represents the description of the product
    // - product_name: a string that represents the name of the product
    // - file: a file that represents the image of the product
    const [error, setError] = useState(null);
    const likes = 0;
    const [price, setPrice] = useState(state?.price || "");
    const [quantity, setQuantity] = useState(state?.quantity || "");
    const [idbrand, setidbrand] = useState(state?.idbrand || "");
    const [idcategory, setidcategory] = useState(state?.idcategory || "");
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [selectedSupermarkets, setSelectedSupermarkets] = useState([]);
    const [measurement, setSelectedMeasurement] = useState(state?.measurement || "");
    const [image_url, setImageUrl] = useState(state?.image_url || "");
    const [value, setValue] = useState(state?.product_description || "");
    const [product_name, setProductName] = useState(state?.product_name || "");
    const [product_description, setProductDescription] = useState(state?.product_description || "");
    const [file, setFile] = useState(null);


    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
        setFile(null); // Reset file in case there was a previous file
    };


    // Set up the function that handles the form submission
    // - handleClick: a function that posts the product when the user clicks the 'Publish' button
    //                (if the user does not fill in the input fields, the function will set the error message)
    const handleClick = async (e) => {
        e.preventDefault();
        //console.log("gggg");

        /*
        if (!product_name || product_name.trim() === "") {
            setError("Name of the product required");
            return;
        }

        if (!value || value.trim() === "") {
            setError("Description of the product required");
            return;
        }

        if (!price || price.trim() === "") {
            setError("Price of the product required");
            return;
        }

        if (!quantity || quantity.trim() === "") {
            setError("Quantity per unit of the product required");
            return;
        }

        if (!measurement) {
            setError("Unit of measurement of the product required");
            return;
        }

        if (!combinedBarcode) {
            setError("Barcode of the product required");
            return;
        }

        if (!idbrand) {
            setError("Brand of the product required");
            return;
        }

        if (!idcategory) {
            setError("Category of the product required");
            return;
        }

        const imgUrl = await upload();
        */
        try {
            //console.log("yyyyy");
            //if (!state) {
                // Post
                const productResponse = await axios.patch(`/products/${postId}`, {
                    product_name,
                    product_description,
                    image: image_url,
                    /*
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    idcategory,
                    iduser,
                    idbrand,
                    barcode: combinedBarcode,
                    price,
                    quantity,
                    measurement,
                    likes,
                    image_url,
                    */
                });

                // Obtain the ID of the created product
                const productId = productResponse.data.id;

                // Post in intermediate table 'productallergies'
                selectedAllergies.forEach(async (idallergies) => {
                    await axios.post(`/productallergies/`, {
                        idallergies: idallergies,
                        idproduct: productId
                
                    })
                });

                // Post in intermediate table 'stock'
                // await axios.post(`/stock/`, {
                //   idsupermarket: marketuser.id,
                //   idproduct: productId,
                //   available: 1
            // })
                
                selectedSupermarkets.forEach(async (idsupermarkets) => {
                    await axios.post(`/stock/`, {
                        idsupermarket: idsupermarkets,
                        idproduct: productId,
                        available: 1
                    })
                });
                

            navigate(`/app/products/${postId}`);
            alert("Product updated successfully");
            //} 
            
        } catch (err) {
            console.log(err);
        }
        
    };

    // Return the JSX elements
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
                    {/*
                    <input
                        type="number"
                        placeholder={t('price')}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <div className="measurement-container-write">
                        <div className="quantity-input-write">
                            <input
                                type="number"
                                placeholder={t("quantity")}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="measurement-input-write">
                            <select
                                value={measurement}
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
                        <h3>{t('barcode')}</h3>
                    </div>

                    <div className="super-bar-code-write">
                        <input
                            type="text"
                            pattern="[0-9]"
                            name="part1"
                            placeholder="X"
                            maxLength="1"
                            value={combinedBarcode.substring(0, 1)}
                            onChange={handleBarcodeChange}
                        />

                        <input
                            type="text"
                            pattern="[0-9]"
                            name="part2"
                            placeholder="X X X X X X"
                            maxLength="6"
                            value={combinedBarcode.substring(1, 7)}
                            onChange={handleBarcodeChange}
                        />

                        <input
                            type="text"
                            pattern="[0-9]"
                            name="part3"
                            placeholder="X X X X X X"
                            maxLength="6"
                            value={combinedBarcode.substring(7, 13)}
                            onChange={handleBarcodeChange}
                        />
                    </div>
                    */
                        
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
                        
                    /*
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

                    <h3 className="picture-title">{t('update')} 📸</h3>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image_url}
                        onChange={handleImageUrlChange} 
                    />

                    <div className="image-write">
                        <div className="image-container-write">
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                name=""
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label className="file-write" htmlFor="file">
                                {t('upload')}
                            </label>

                        </div>
                    </div>
                */}

                    {error && <p className="error-message-write">{error}</p>}
                    <div className="buttons-write">
                        <button onClick={handleSubmit}>{t("update")}</button>
                    </div>

                </div>
            </div>
        </div>
    );

};

// Export the Write component so that it can be used in other files.
export default EditProduct;
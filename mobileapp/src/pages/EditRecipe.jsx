import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from '../config/proxy.js';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import BackArrow from "../components/BackArrow";
import "./PostRecipe.css";

// EditRecipe component
const EditRecipe = () => {
    // Obtains the state from the location and the navigation
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[3];

    // Obtains the current user from the context
    const { currentUser } = useContext(AuthContext);

    const [productData, setProductData] = useState({
        title: "",
        time: "",
        unit: "",
        ammountofpeople: "",
        image_url: "",
        description: "",
        valuesteps: "",
        file: ""
    });

    const handleInputChange = (field, value) => {
        setProductData((prevProductData) => ({
            ...prevProductData,
            [field]: value,
        }));
    };

    const handleImageInputChange = (value) => {
        handleInputChange("image_url", value);
    };

    const [error, setError] = useState(null);
    const [desciption, setValuedes] = useState(productData.description || "");
    const [valuesteps, setValuesteps] = useState(productData.valuesteps || "");

    const fetchProductDataFromServer = async () => {
        try {
            console.log("postId:", postId);
            const response = await axios.get(`${BACKEND_API_URL}/recipes/${postId}`);
            const productData = response.data;
            setProductData({
                ...productData,
                description: productData.description || "",
                valuesteps: productData.steps || "",
            });
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        fetchProductDataFromServer();
    }, [postId]);

    // Set up the function that handles the form submission
    // - if the user does not fill in the input fields, the function will set the error message
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Patch
            await axios.patch(`${BACKEND_API_URL}/recipes/${postId}`, {
                //iduser,
                title: productData.title,
                time: productData.time,
                unit: productData.unit,
                ammountofpeople: productData.ammountofpeople,
                description: productData.description,
                steps: productData.valuesteps,
                likes: productData.likes,
                image: productData.file ? productData.imgUrl : "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                image_url: productData.image_url,
            });
        }
        catch (err) {
            console.log(err);
        }

        navigate(`/app/recipes/${postId}`);
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const hidePopup = () => {
        setShowPopup(false);
        navigate(`/app/recipes/${postId}`);
    };

    return (
        <div className="add-write add-write1">

            <BackArrow />

            <h1 className="supertitle-write">Edit My Recipe <span className="text-danger">❤</span></h1>

            <div className="content-write">

                <input
                    type="text"
                    placeholder="Title of the recipe"
                    value={productData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />

                <div className="measurement-container">
                    <div className="quantity-input">
                        <input
                            type="number"
                            placeholder="Time of preparation"
                            value={productData.time}
                            onChange={(e) => handleInputChange("time", e.target.value)}
                        />
                    </div>
                    <div className="measurement-input-write">
                        <select
                            value={productData.unit}
                            onChange={(e) => handleInputChange("unit", e.target.value)}
                        >
                            <option value="">Measure</option>
                            <option value="minutes">minutes</option>
                            <option value="hours">hours</option>
                        </select>
                    </div>
                </div>

                <div className="quantity-input">
                    <input
                        type="number"
                        placeholder="For how many people"
                        value={productData.ammountofpeople}
                        onChange={(e) => handleInputChange("ammountofpeople", e.target.value)}
                    />
                </div>

                <div className="editorContainer-write">
                    <ReactQuill
                        placeholder="Description of the recipe"
                        className="editor"
                        theme="snow"
                        value={productData.description}
                        onChange={(value) => handleInputChange("description", value)}
                        modules={{
                            toolbar: {
                                container: [
                                    ["bold", "italic", "underline"],
                                ],
                            },
                            clipboard: { matchVisual: false },
                            mention: false,
                        }}
                    />
                </div>

                <div className="editorContainer-write">
                    <ReactQuill
                        placeholder="Steps to follow"
                        className="editor"
                        theme="snow"
                        value={productData.valuesteps}
                        onChange={(value) => handleInputChange("valuesteps", value)}
                        modules={{
                            toolbar: {
                                container: [
                                    ["bold", "italic", "underline"],
                                ],
                            },
                            clipboard: { matchVisual: false },
                            mention: false,
                        }}
                    />
                </div>

                <h3 className="picture-title">Update a picture 📸</h3>

                <div className="image-write">
                    <div className="image-container-write">
                        <input
                            type="text"
                            placeholder="Image url"
                            value={productData.image_url}
                            onChange={(e) => handleImageInputChange(e.target.value)}
                        />
                        <label className="file-write" htmlFor="file">
                            Upload Image (png or jpg)
                        </label>
                    </div>
                </div>

                {error && <p className="error-message-write">{error}</p>}

                <div className="buttons-write-recipe">
                    <button onClick={togglePopup}>Update</button>
                </div>

                <Modal show={showPopup} onHide={hidePopup} centered animation="slide-up">
                    <Modal.Header closeButton>
                        <h4
                            style={{
                                marginBottom: "-10px",
                                marginLeft: "65px",
                                marginTop: "10px",
                                textAlign: "center",
                                fontSize: "25px",
                            }}
                            classname="post-popup-text"
                        >
                            Confirm Update
                        </h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-around">
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
                                Confirm
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    );

};

// Exporting Write component
export default EditRecipe;
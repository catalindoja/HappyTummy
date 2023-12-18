import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap'; // Adjust the import based on your UI library
import "./PostProduct.css";

const EditRecipe = () => {
    const location = useLocation();
    const state = location.state || {};

    const { t } = useTranslation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];

    const [recipeData, setRecipeData] = useState({
        recipe_name: "",
        recipe_description: "",
        // Add other fields as needed
    });
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null); // Placeholder for error
    const [time, setTime] = useState(state?.price || "");
    const [unit, setSelectedUnit] = useState(state?.measurement || "");
    const [ammountofpeople, setPeople] = useState(state?.price || "");

    const hidePopup = () => {
        setShowPopup(false);
    };

    const handleInputChange = (field, value) => {
        setRecipeData((prevRecipeData) => ({
            ...prevRecipeData,
            [field]: value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            // Patch
            await axios.patch(`/recipes/${postId}`, {
                title: recipeData.title,
                description: recipeData.description,
            });
            const recipeId = postId;

            alert("recipe updated successfully");
            hidePopup();
            navigate(`/recipes/${postId}`);
        } catch (err) {
            console.log(err);
        }
    };


    const fetchrecipeDataFromServer = async () => {
        try {
            const response = await axios.get(`/recipes/${postId}`);
            const recipeData = response.data;
            setRecipeData(recipeData);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        fetchrecipeDataFromServer();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/recipes/${postId}`, {
                title: recipeData.title,
                description: recipeData.description,
                // Add other fields as needed
            });
            alert("recipe updated successfully");
            navigate(`/recipes/${postId}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className="supertitle-write">{t('Edit recipe')} <span className="text-danger">❤</span></h2>
            <div className="add-write">
                <div className="content-write">
                    <input
                        type="text"
                        placeholder={t('name_recipe')}
                        value={recipeData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                    />

                    <div className="editorContainer-write">
                        <ReactQuill
                            placeholder={t('recipe_description')}
                            className="editor-write"
                            theme="snow"
                            value={recipeData.description}
                            onChange={(value) => handleInputChange("description", value)}
                        />
                    </div>
  
                    <div className="super-bar-code-write">
                        <h3>{t('Time')}</h3>
                    </div>
  
                    <input
                        type="number"
                        placeholder={t('time')}
                        value={recipeData.time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <div className="measurement-input-write">
                      <select
                        value={recipeData.unit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                      >
                        <option value="minute">Minutes</option>
                        <option value="hour">Hours</option>
                      </select>
                    </div>
  
                    <div className="super-bar-code-write">
                        <h3>{t('Ammount of people')}</h3>
                    </div>

                    <input
                        type="number"
                        placeholder={t('ammountofpeople')}
                        value={recipeData.ammountofpeople}
                        onChange={(e) => setPeople(e.target.value)}
                    />

                    <div className="super-bar-code-write">
                        <h3>{t('Steps')}</h3>
                    </div>

                    <div className="editorContainer-write">
                        <ReactQuill
                            placeholder={t('recipe_description')}
                            className="editor-write"
                            theme="snow"
                            value={recipeData.steps}
                            onChange={(value) => handleInputChange("description", value)}
                        />
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

export default EditRecipe;
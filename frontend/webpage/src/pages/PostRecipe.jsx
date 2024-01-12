import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";

// Create the PostRecepie component
function PostRecepie() {
    const { currentUser } = useContext(AuthContext);
    const iduser = currentUser.id;
    const state = useLocation().state;
    const [steps, setSteps] = useState(state?.steps || "");
    const navigate = useNavigate();

    // Set up the state variables
    const [errors, setErrors] = useState({
        title: false,
        time: false,
        unit: false,
        ammountofpeople: false,
        value: false,
        steps: false,
    });

    const [title, setRecipeTitle] = useState(state?.title || "");
    const [value, setValue] = useState(state?.description || "");
    const [time, setTime] = useState(state?.time || "");
    const [ammountofpeople, setPeople] = useState(state?.ammountofpeople || "");
    const [unit, setSelectedTimeMeasurement] = useState(state?.unit || "");
    const [file, setFile] = useState(null);
    const [image_url, setImageUrl] = useState(state?.image_url || "");

    // Set up the function that uploads the image
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

    // Set up the function that handles the form submission
    const handleClick = async (e) => {
        e.preventDefault();

        const fields = { title, time, unit, ammountofpeople, value, steps };
        const errorFields = { title: false, time: false, unit: false, ammountofpeople: false, value: false, steps: false };

        // Check for missing fields
        Object.keys(fields).forEach((key) => {
            if (!fields[key] || fields[key].trim() === "") {
                errorFields[key] = true;
            }
        });

        setErrors({ ...errorFields });

        // If any field is missing, return
        if (Object.values(errorFields).some((value) => value)) {
            return;
        }

        const imgUrl = await upload();

        try {
            if (!state) {
                // Post
                await axios.post(`/recipes/`, {
                    iduser,
                    title,
                    time,
                    unit,
                    ammountofpeople,
                    description: value,
                    steps,
                    likes: 0,
                    image: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    image_url,
                });
            } else {
                // Patch
                await axios.patch(`/recipes/`, {
                    iduser,
                    title,
                    time,
                    unit,
                    ammountofpeople,
                    description: value,
                    steps,
                    likes: 0,
                    image: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    image_url,
                });
            }
            navigate("/recipes");
        } catch (err) {
            console.log(err);
        }
    };

    // Set up the function to handle Quill change for description and steps
    const handleQuillChange = (value, setValueFunction, errorState, setErrorState) => {
        // Check if the content contains images or links to images
        if (value.includes("<img") || value.match(/\bhttps?:\/\/\S+\b/) || value.match(/\b\w+\.(jpg|jpeg|png|gif|bmp)\b/)) {
            setErrorState({ ...errors, [errorState]: `Please enter text only, no images or links to images for ${errorState}.` });
        } else {
            setErrorState({ ...errors, [errorState]: false });
            setValueFunction(value);
        }
    };

    return (
        <div>
            <h1 className="supertitle">Post a new recipe ❤</h1>
            <div className="add">
                <div className="content">

                    <input
                        type="text"
                        placeholder="Title of the recipe"
                        onChange={(e) => setRecipeTitle(e.target.value)}
                    />

                    <div className="measurement-container">
                        <div className="quantity-input">
                            <input
                                type="number"
                                placeholder="Time of preparation"
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        <div className="measurement-input">
                            <select
                                value={unit}
                                onChange={(e) => setSelectedTimeMeasurement(e.target.value)}
                            >
                                <option value="">Select a time measure</option>
                                <option value="minutes">minutes</option>
                                <option value="hours">hours</option>
                            </select>
                        </div>
                    </div>

                    <div className="quantity-input">
                        <input
                            type="number"
                            placeholder="For how many people"
                            onChange={(e) => setPeople(e.target.value)}
                        />
                    </div>

                    <div className="editorContainer">
                        <ReactQuill
                            placeholder="Description of the recipe"
                            className={`editor ${errors.value ? "error" : ""}`}
                            theme="snow"
                            value={value}
                            onChange={(val) => handleQuillChange(val, setValue, "value", setErrors)}
                        />
                        {errors.value && <p className="error-message">{errors.value}</p>}
                    </div>

                    <div className="editorContainer">
                        <ReactQuill
                            placeholder="Steps of the recipe"
                            className={`editor ${errors.steps ? "error" : ""}`}
                            theme="snow"
                            value={steps}
                            onChange={(val) => handleQuillChange(val, setSteps, "steps", setErrors)}
                        />
                        {errors.steps && <p className="error-message">{errors.steps}</p>}
                    </div>

                    <input
                        type="text"
                        placeholder="Image url"
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <div className="image">
                        <div className="image-container">
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                name=""
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label className="file" htmlFor="file">
                                Upload Image (png or jpg)
                            </label>

                        </div>
                    </div>

                    <div className="buttons">
                        <button onClick={handleClick}>Publish</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default PostRecepie;
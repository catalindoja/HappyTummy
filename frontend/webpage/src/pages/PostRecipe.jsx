import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";

function PostRecepie() {
    const { currentUser } = useContext(AuthContext);
    const iduser = currentUser.id;
    const state = useLocation().state;
    const navigate = useNavigate();

    // Fields
    const likes = 0;
    const [title, setRecipeTitle] = useState(state?.title || "");
    const [value, setValue] = useState(state?.description || "");
    const [time, setTime] = useState(state?.time || "");
    const [ammountofpeople, setPeople] = useState(state?.ammountofpeople || "");
    const [unit, setSelectedTimeMeasurement] = useState(state?.unit || "");
    const [file, setFile] = useState(null);
    const [image_url, setImageUrl] = useState(null);

    // Mensaje de error
    const [error, setError] = useState(null);

    // Para subir la imagen
    const upload = async () => {
        try {
            const formData = new FormData();
            console.log(file)
            formData.append("file", file);
            const res = await axios.post("/upload", formData);    // ESTO ME FALLA
            return res.data;
        } catch (err) {
            console.log("ERROR :(")
            console.log(err);
        }
    };

    // Cuando se hace click al botón de publish
    const handleClick = async (e) => {
        e.preventDefault();

        if (!title || title.trim() === "") {
            setError("Tile of the recipe required");
            return;
        }

        if (!time || time.trim() === "") {
            setError("Time of preparation required");
            return;
        }

        if (!unit) {
            setError("Time measure of the preparation required");
            return;
        }

        if (!ammountofpeople || ammountofpeople.trim() === "") {
            setError("For how many people field required");
            return;
        }

        if (!value || value.trim() === "") {
            setError("Description of the recipe required");
            return;
        }

        // Para publicar la imagen
        const imgUrl = await upload();

        try {
            if (!state) {
                const recipeResponse = await axios.post(`/recipes/`, {
                    iduser,
                    title,
                    time,
                    unit,
                    ammountofpeople,
                    description: value,
                    likes,
                    image: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    image_url,
                });
            } else {
                const recipeResponse = await axios.patch(`/recipes/`, {
                    iduser,
                    title,
                    time,
                    unit,
                    ammountofpeople,
                    description: value,
                    likes,
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
                            className="editor"
                            theme="snow"
                            value={value}
                            onChange={setValue}
                        />
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

                    {error && <p className="error-message">{error}</p>}
                    <div className="buttons">
                        <button onClick={handleClick}>Publish</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PostRecepie;
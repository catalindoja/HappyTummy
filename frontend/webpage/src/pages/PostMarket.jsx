
import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";
// const fs = require("fs");

const PostMarket = () => {
    const state = useLocation().state;
    const navigate = useNavigate();

    const [name, setMarketName] = useState(state?.name || "");
    const [value, setValue] = useState(state?.description || "");
    const [address, setMarketAddress] = useState(state?.address || "");
    const [city, setMarketCity] = useState(state?.city || "");
    const [zipcode, setMarketZipcode] = useState(state?.zipcode || "");
    const [image_url, setImageUrl] = useState(state?.image_url || "");
    const [file, setFile] = useState(null);


    const upload = async () => {
        try {
            console.log("1º LLAMADA A SUBIR FILE")
            const formData = new FormData();
            formData.append("file", file);
            console.log("2º A PUNTO DE SUBIR FILE")

            const res = await axios.post("/upload", formData);    // ESTO ME FALLA

            console.log("3º SUBIDO!")
            return res.data;
        } catch (err) {
            console.log("ERROR :(")
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        // Para la imagen
        const imgUrl = await upload();

        try {
            if (!state) {

                const marketResponse = await axios.post(`/markets/`, {
                    name,
                    description: value,
                    address,
                    city,
                    zipcode,
                    image: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                    image_url,
                });

                navigate("/markets");

            } else {
                // Patch
                const marketResponse = await axios.patch(`/markets/${state.id}`, {
                    name,
                    description: value,
                    address,
                    city,
                    zipcode,
                    image: file ? imgUrl : "",
                    image_url,
                });

                navigate("/markets");

            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1 className="supertitle">Post a new market ❤</h1>
            <div className="add">
                <div className="content">

                    <input
                        type="text"
                        placeholder="Name of the Market"
                        onChange={(e) => setMarketName(e.target.value)}
                    />

                    <div className="editorContainer">
                        <ReactQuill
                            placeholder="Description of the market"
                            className="editor"
                            theme="snow"
                            value={value}
                            onChange={setValue}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Market address"
                        onChange={(e) => setMarketAddress(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Market city"
                        onChange={(e) => setMarketCity(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Market zipcode"
                        onChange={(e) => setMarketZipcode(e.target.value)}
                    />

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
                                Upload Image
                            </label>
                        </div>
                    </div>

                    <div className="buttons">
                        {/*<button>Save as a draft</button>*/}
                        <button onClick={handleClick}>Publish</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostMarket;
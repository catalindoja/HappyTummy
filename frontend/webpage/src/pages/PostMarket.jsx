
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import moment from "moment";

// Create the PostMarket component
const PostMarket = () => {

    const state = useLocation().state;
    const navigate = useNavigate();

    // Set up the state variables
    // - name: a string that represents the name of the market
    // - value: a string that represents the description of the market
    // - address: a string that represents the address of the market
    // - city: a string that represents the city of the market
    // - zipcode: a string that represents the zipcode of the market
    // - image_url: a string that represents the image url of the market
    // - file: a file that represents the image of the market
    const [name, setMarketName] = useState(state?.name || "");
    const [value, setValue] = useState(state?.description || "");
    const [address, setMarketAddress] = useState(state?.address || "");
    const [city, setMarketCity] = useState(state?.city || "");
    const [zipcode, setMarketZipcode] = useState(state?.zipcode || "");
    const [image_url, setImageUrl] = useState(state?.image_url || "");
    const [file, setFile] = useState(null);

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
        const imgUrl = await upload();

        try {
            if (!state) {
                // Post
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

    // Return the JSX elements
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
                        <button onClick={handleClick}>Publish</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Export the PostMarket component so that it can be used in other files.
export default PostMarket;
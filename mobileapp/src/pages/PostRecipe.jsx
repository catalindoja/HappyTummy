import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import "./PostRecipe.css";
import { BACKEND_API_URL } from '../config/proxy.js';

// Create the Write component
const Write = () => {

  // Obtains the state from the location
  const state = useLocation().state;
  const navigate = useNavigate();

  // Obtains the current user from the context
  const { currentUser } = useContext(AuthContext);
  const iduser = currentUser.id;

  // To upload the image
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${BACKEND_API_URL}/upload`, formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const [error, setError] = useState(null);
  const likes = 0;

  // FOR RECIPES
  const [title, setRecipeTitle] = useState(state?.title || "");
  const [time, setTime] = useState(state?.time || "");
  const [unit, setSelectedTimeMeasurement] = useState(state?.unit || "");
  const [ammountofpeople, setPeople] = useState(state?.ammountofpeople || "");
  const [image_url, setImageUrl] = useState(state?.image_url || "");
  const [valuedes, setValuedes] = useState(state?.description || "");
  const [valuesteps, setValuesteps] = useState(state?.steps || "");
  const [file, setFile] = useState(null);

    // Set up the function that handles the form submission
    // - if the user does not fill in the input fields, the function will set the error message
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

      if (!valuedes || valuedes.trim() === "") {
          setError("Description of the recipe required");
          return;
      }

      if (!valuesteps || valuesteps.trim() === "") {
        setError("Steps of the recipe required");
        return;
    }

      const imgUrl = await upload();
      try {
          if (!state) {
              // Post
              const recipeResponse = await axios.post(`${BACKEND_API_URL}/recipes/`, {
                  iduser,
                  title,
                  time,
                  unit,
                  ammountofpeople,
                  description: valuedes,
                  steps: valuesteps,
                  likes,
                  image: file ? imgUrl : "",
                  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  image_url,
              });
          } else {
              // Patch
              const recipeResponse = await axios.patch(`${BACKEND_API_URL}/recipes/`, {
                  iduser,
                  title,
                  time,
                  unit,
                  ammountofpeople,
                  description: valuedes,
                  steps: valuesteps,
                  likes,
                  image: file ? imgUrl : "",
                  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  image_url,
              });
          }
          navigate("/app/home");
      } catch (err) {
          console.log(err);
      }
  };

  // Return the JSX elements
  return (
    <div>
      <h1 className="supertitle-write">Post a new recipe ❤</h1>
      <div className="add-write">
        <div className="content-write">

          {/* <input
            type="text"
            placeholder="Name of the product"
            onChange={(e) => setProductName(e.target.value)}
          /> */}

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
            <div className="measurement-input-write">
              <select
                value={unit}
                onChange={(e) => setSelectedTimeMeasurement(e.target.value)}
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
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>

          <div className="editorContainer-write">
            <ReactQuill
              placeholder="Description of the recipe"
              className="editor"
              theme="snow"
              value={valuedes}
              onChange={setValuedes}
            />
          </div>

          <div className="editorContainer-write">
            <ReactQuill
              placeholder="Steps to follow"
              className="editor"
              theme="snow"
              value={valuesteps}
              onChange={setValuesteps}
            />
          </div>

          <h3 className="picture-title">Update a picture 📸</h3>
          <input
            type="text"
            placeholder="Image url"
            onChange={(e) => setImageUrl(e.target.value)}
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
                Upload Image (png or jpg)
              </label>

            </div>
          </div>

          {error && <p className="error-message-write">{error}</p>}
          <div className="buttons-write">
            <button onClick={handleClick}>Publish</button>
          </div>

        </div>
      </div>
    </div>
  );

};

// Export the Write component so that it can be used in other files.
export default Write;

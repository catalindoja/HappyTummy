import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import gluten from "../img/gluten.png";
import { useEffect } from "react";
const uploadDirectory = "/upload"
// const fs = require("fs");

const Write = () => {

    const state = useLocation().state;

    // Para las alergias!!
    const [allergies, setAllergies] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/allergies`);
          console.log(res.data)
          setAllergies(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    });

    // Para las categorias!!
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
    });

  // Para descripciones de alergias y categorias
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // Nuevos campos
  const [barcode, setProductBarcode] = useState(state?.barcode || "");
  const [brand, setBrand] = useState(state?.brand || "");
  const [price, setPrice] = useState(state?.price || "");
  const likes = 0;

  // Y todo esto ya estaba
  const [value, setValue] = useState(state?.product_description || "");
  const [product_name, setProductName] = useState(state?.product_name || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      console.log("QLE")
      const formData = new FormData();
      formData.append("file", file);
      console.log("QUE SUBO EL FILE")
      const res = await axios.post("/upload", formData);    // ESTO ME FALLA
      console.log("SUBIDO FILE")
      return res.data;
    } catch (err) {
      console.log("ERRORCILLO")
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.patch(`/products/${state.id}`, {
            product_name,
            product_description: value,
            //cat,
            image: file ? imgUrl : "",
            
            brand,
            barcode,
            price,
          })
        : await axios.post(`/products/`, {
            product_name,
            product_description: value,
            //cat,
            image: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

            brand,
            barcode,
            price,
            likes,
          });
          navigate("/products")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <h1>Post a new product ❤</h1>
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Name of the product"
          onChange={(e) => setProductName(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            placeholder="Description of the product"
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <input
          type="text"
          placeholder="Bar code number (X-XXXXXX-XXXXXX)"
          onChange={(e) => setProductBarcode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

    <div className="boxes">
      <fieldset>
        <legend>Allergies and Intolerances</legend>
        {allergies.map((allergy) => (
          <div key={allergy.id}>
            <input type="checkbox" id={allergy.allergy_name} name="alergies[]" value={allergy.allergy_name} />
            <label for={allergy.allergy_name}>{allergy.allergy_name}</label>
          </div>
        ))}
      </fieldset>
    </div>

    <div className="boxes">
      <fieldset>
        <legend>Categories</legend>
        {categories.map((category) => (
          <div key={category.id}>
            <input type="checkbox" id={category.category_name} name="categories[]" value={category.category_name} />
            <label for={category.category_name}>{category.category_name}</label>
          </div>
        ))}
      </fieldset>
    </div>

    

    <h1>¿SELECTOR PARA BRAND? EL SUPERMARKET DEBERIA SER POR DEFECTO</h1>

{/* 
// ESTA ES LA VERSIÓN ANTERIOR!! SOLO DE PRUEBAS
    {allergies.map((allergy) => (
          <div key={allergy.id}>
            <div>
              <h1>{allergy.allergy_name}</h1>
              <p>{getText(allergy.allergy_description)}</p>
            </div>
          </div>
        ))}

      <div className="boxes">
      <fieldset>
        <legend>Alergias e Intolerancias</legend>
        <div>
          <input type="checkbox" id="gluten" name="alergias[]" value="gluten" />
          <label for="gluten">Gluten</label>
        </div>

        <div>
          <input type="checkbox" id="lacteos" name="alergias[]" value="lacteos" />
          <label for="lacteos">Lácteos</label>
        </div>

        <div>
          <input type="checkbox" id="huevo" name="alergias[]" value="huevo" />
          <label for="huevo">Huevo</label>
        </div>

        <div>
          <input type="checkbox" id="cacahuetes" name="alergias[]" value="cacahuetes" />
          <label for="cacahuetes">Cacahuetes</label>
        </div>

        <div>
          <input type="checkbox" id="pescado" name="alergias[]" value="pescado" />
          <label for="pescado">Pescado</label>
        </div>

        <div>
          <input type="checkbox" id="crustaceos" name="alergias[]" value="crustaceos" />
          <label for="crustaceos">Crustáceos</label>
        </div>

        <div>
          <input type="checkbox" id="soja" name="alergias[]" value="soja" />
          <label for="soja">Soja</label>
        </div>

        <div>
          <input type="checkbox" id="frutos_cascara" name="alergias[]" value="frutos_cascara" />
          <label for="frutos_cascara">Frutos de cáscara</label>
        </div>

        <div>
          <input type="checkbox" id="apio" name="alergias[]" value="apio" />
          <label for="apio">Apio</label>
        </div>

        <div>
          <input type="checkbox" id="mostaza" name="alergias[]" value="mostaza" />
          <label for="mostaza">Mostaza</label>
        </div>

        <div>
          <input type="checkbox" id="moluscos" name="alergias[]" value="moluscos" />
          <label for="moluscos">Moluscos</label>
        </div>

        <div>
          <input type="checkbox" id="sesamo" name="alergias[]" value="sesamo" />
          <label for="sesamo">Granos de sésamo</label>
        </div>

        <div>
          <input type="checkbox" id="azufre_sulfitos" name="alergias[]" value="azufre_sulfitos" />
          <label for="azufre_sulfitos">Dióxido de azufre y sulfitos</label>
        </div>

        <div>
          <input type="checkbox" id="altramuces" name="alergias[]" value="altramuces" />
          <label for="altramuces">Altramuces</label>
        </div>
      </fieldset>

     </div> */}
      </div>

      {/* A PARTIR DE AQUÍ, ES EL MENU DE LA DERECHA*/}
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
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
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Write;

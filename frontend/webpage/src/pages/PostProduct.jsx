import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { AuthContext } from "../context/authContext";
// const fs = require("fs");

const Write = () => {

  const state = useLocation().state;
  const navigate = useNavigate();

  // Para la lista de brands!!
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

  // Para la lista de alergias!!
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
  }, []);

  // Para la lista de categorias!!
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

  // Para descripciones de alergias y categorias (no lo uso)
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // Para agregar o eliminar alergias del array
  const handleAllergyToggle = (allergyId) => {
    if (selectedAllergies.includes(allergyId)) {
      // Si la alergia ya está seleccionada, la eliminamos del array.
      setSelectedAllergies(selectedAllergies.filter((id) => id !== allergyId));
    } else {
      // Si la alergia no está seleccionada, la agregamos al array.
      setSelectedAllergies([...selectedAllergies, allergyId]);
    }
  };

  // Nuevos campos
  const { currentUser } = useContext(AuthContext);
  const iduser = currentUser.id;

  const [marketnameuser, setMarketNameUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/markets/${currentUser.idsupermarket}`);
        const name = response.data.name;
        setMarketNameUser(name); // Actualiza el estado con el nombre del mercado
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.idsupermarket]);

  const likes = 0;
  const [barcode, setProductBarcode] = useState(state?.barcode || "");
  const [price, setPrice] = useState(state?.price || "");
  const [quantity, setQuantity] = useState(state?.quantity || "");
  const [measurement, setMeasurement] = useState(state?.measurement || "");
  const [idbrand, setidbrand] = useState(state?.idbrand || "");
  const [idcategory, setidcategory] = useState(state?.idcategory || "");
  const [selectedAllergies, setSelectedAllergies] = useState([]); // Allergies (post en 'productallergies' adicional, tabla intermedia)

  // Campos que ya estaban
  const [value, setValue] = useState(state?.product_description || "");
  const [product_name, setProductName] = useState(state?.product_name || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  // Para mostrar el contenido del array de alergias (solo para tests)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(selectedAllergies);
  //   }, 1000); // El valor 2000 representa 2 segundos en milisegundos

  //   // Limpia el interval cuando el componente se desmonta
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [selectedAllergies]);

  // Para subir la imagen
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

  // Cuando se hace click al botón de publish
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("ffff");
    // Para la imagen
    const imgUrl = await upload();

    try {
      if (!state) {

        const productResponse = await axios.post(`/products/`, {
          product_name,
          product_description: value,
          image: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

          // Nuevos
          idcategory,
          iduser,
          idbrand,
          barcode,
          price,
          quantity,
          measurement,
          likes,
        });

        // Obtener el ID del producto creado
        const productId = productResponse.data.id;

        // Post en tabla intermedia 'productallergies'
        selectedAllergies.forEach(async (idallergies) => {
          await axios.post(`/productallergies/`, {
            idallergies: idallergies,
            idproduct: productId
          })
        });

        navigate("/products");

      } else {
        // Patch
        const productResponse = await axios.patch(`/products/${state.id}`, {
          product_name,
          product_description: value,
          image: file ? imgUrl : "",

          // Nuevos
          idcategory,
          iduser,
          idbrand,
          barcode,
          price,
          quantity,
          measurement,
        });

        // Obtener el ID del producto creado
        const productId = productResponse.data.id;

        // Put en tabla intermedia 'productallergies'
        selectedAllergies.forEach(async (idallergies) => {
          await axios.put(`/productallergies/`, {
            idallergies: idallergies,
            idproduct: productId
          })
        });

        navigate("/products");

      }
    } catch (err) {
      console.log(err);
    }
  };

  // Lo que se muestra en pantalla
  return (
    <div>
      <h1>Post a new product ❤</h1>
      <div className="add">
        <div className="content">

          <div className="market">
            <h3>Supermarket</h3>
            <div className="market-container">
              {marketnameuser}
            </div>
          </div>

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
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="measurement-container">
            <div className="quantity-input">
              <input
                type="number"
                placeholder="Quantity per unit"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="measurement-input">
              <input
                type="text"
                placeholder="Unit of measurement"
                onChange={(e) => setMeasurement(e.target.value)}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="Bar code number (X-XXXXXX-XXXXXX)"
            onChange={(e) => setProductBarcode(e.target.value)}
          />

          <div className="boxes">
            <fieldset>
              <legend>Allergies and Intolerances</legend>
              {allergies.map((allergy) => (
                <div key={allergy.id}>
                  <input type="checkbox" id={allergy.allergy_name} name="alergies[]"
                    checked={selectedAllergies.includes(allergy.id)}
                    onChange={() => handleAllergyToggle(allergy.id)} />
                  <label htmlFor={allergy.allergy_name}>{allergy.allergy_name}</label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="boxes">
            <fieldset>
              <legend>Brand</legend>
              {brands.map((brand) => (
                <div key={brand.id}>
                  <input type="radio" id={brand.name} name="idbrand" value={brand.id} onChange={() => setidbrand(brand.id)} />
                  <label htmlFor={brand.name}>{brand.name}</label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="boxes">
            <fieldset>
              <legend>Category</legend>
              {categories.map((category) => (
                <div key={category.id}>
                  <input type="radio" id={category.category_name} name="iccategory" value={category.id} onChange={() => setidcategory(category.id)} />
                  <label htmlFor={category.category_name}>{category.category_name}</label>
                </div>
              ))}
            </fieldset>
          </div>

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

export default Write;

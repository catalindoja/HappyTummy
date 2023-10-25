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

  const [marketuser, setMarketNameUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/markets/${currentUser.idsupermarket}`);
        const data = response.data;
        setMarketNameUser(data); // Actualiza el estado con el nombre del mercado
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.idsupermarket]);

  const [combinedBarcode, setCombinedBarcode] = useState(state?.barcode || "");
  const handleBarcodeChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el estado correspondiente según el campo
    if (name === "part1") {
      // Combina el valor del primer campo con los valores de los otros dos campos
      const combined = `${value}${combinedBarcode.substring(1, 7)}${combinedBarcode.substring(8, 14)}`;
      setCombinedBarcode(combined);
    } else if (name === "part2") {
      // Combina el valor del segundo campo con los valores de los otros dos campos
      const combined = `${combinedBarcode.substring(0, 1)}${value}${combinedBarcode.substring(8, 14)}`;
      setCombinedBarcode(combined);
    } else if (name === "part3") {
      // Combina el valor del tercer campo con los valores de los otros dos campos
      const combined = `${combinedBarcode.substring(0, 7)}${value}`;
      setCombinedBarcode(combined);
    }
  };

  // const [barcode, setProductBarcode] = useState(state?.barcode || "");
  // const [measurement, setMeasurement] = useState(state?.measurement || "");
  const likes = 0;
  const [price, setPrice] = useState(state?.price || "");
  const [quantity, setQuantity] = useState(state?.quantity || "");
  const [idbrand, setidbrand] = useState(state?.idbrand || "");
  const [idcategory, setidcategory] = useState(state?.idcategory || "");
  const [selectedAllergies, setSelectedAllergies] = useState([]); // Allergies (post en 'productallergies' adicional, tabla intermedia)
  const [measurement, setSelectedMeasurement] = useState(state?.measurement || "");

  // Campos que ya estaban
  const [value, setValue] = useState(state?.product_description || "");
  const [product_name, setProductName] = useState(state?.product_name || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  // Para subir la imagen
  const upload = async () => {
    try {

      console.log("1º LLAMADA A SUBIR FILE")
      const formData = new FormData();
      console.log(file)
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

  // Imagen pero BLOB (solo es test)
  // const [imageData, setImageData] = useState(null);
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     console.log("PASAMELO A BLOB")
  //   }
  // }

  // Mensaje de error
  const [error, setError] = useState(null);

  // Cuando se hace click al botón de publish
  const handleClick = async (e) => {
    e.preventDefault();

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

    // if (!measurement || measurement.trim() === "") {
    //   setError("Unit of measurement of the product required");
    //   return;
    // }

    if (!measurement) {
      setError("Unit of measurement of the product required");
      return;
    }

    if (!combinedBarcode) {
      setError("Barcode of the product required");
      return;
    }

    // Puede ser que no tenga alérgenos
    // console.log()
    // if (selectedAllergies.length === 0) {
    //   setError("Allergies of the product required");
    //   return;
    // }

    if (!idbrand) {
      setError("Brand of the product required");
      return;
    }

    if (!idcategory) {
      setError("Category of the product required");
      return;
    }

    // Para publicar la imagen
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
          barcode: combinedBarcode,
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

        // Post en tabla intermedia 'stock'
        await axios.post(`/stock/`, {
          idsupermarket: marketuser.id,
          idproduct: productId,
          available: 1
        })

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
          barcode: combinedBarcode,
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

        // Put en tabla intermedia 'stock'
        await axios.put(`/stock/`, {
          idsupermarket: marketuser.id,
          idproduct: productId,
          available: 1
        })

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
              {marketuser.name}
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
              <select
                value={measurement}
                onChange={(e) => setSelectedMeasurement(e.target.value)}
              >
                <option value="">Select a measurement unit</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="mg">mg</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="unidad">unidad</option>
              </select>
            </div>
          </div>

          {/* <input
            type="text"
            placeholder="Bar code number (X-XXXXXX-XXXXXX)"
            onChange={(e) => setProductBarcode(e.target.value)}
          /> */}

          <div className="super-bar-code">
            <h3>Bar code number EAN-13 / GTIN-13 (X-XXXXXX-XXXXXX)</h3>
          </div>

          <div className="super-bar-code">
            <input
              type="text"
              pattern="[0-9]"
              name="part1" // Agrega el nombre del campo
              placeholder="X"
              maxLength="1"
              value={combinedBarcode.substring(0, 1)} // Usa el valor combinado para el primer campo
              onChange={handleBarcodeChange} // Usa la función para el cambio
            />

            <input
              type="text"
              pattern="[0-9]"
              name="part2" // Agrega el nombre del campo
              placeholder="X X X X X X"
              maxLength="6"
              value={combinedBarcode.substring(1, 7)} // Usa el valor combinado para el segundo campo
              onChange={handleBarcodeChange} // Usa la función para el cambio
            />

            <input
              type="text"
              pattern="[0-9]"
              name="part3" // Agrega el nombre del campo
              placeholder="X X X X X X"
              maxLength="6"
              value={combinedBarcode.substring(7, 13)} // Usa el valor combinado para el tercer campo
              onChange={handleBarcodeChange} // Usa la función para el cambio
            />
          </div>

          <div className="boxes">
            <fieldset>
              <legend>Allergies and Intolerances</legend>
              <span>It contains...</span>
              {allergies.map((allergy) => (
                <div key={allergy.id}>
                  <input type="checkbox" id={allergy.allergy_name} name="alergies[]"
                    checked={selectedAllergies.includes(allergy.id)}
                    onChange={() => handleAllergyToggle(allergy.id)}
                    className="custom-checkbox" />
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
                Upload Image (png or jpg)
              </label>

            </div>
          </div>

          {/* <div>
            <h1>Subir una imagen como BLOB</h1>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*" // Asegura que solo se puedan seleccionar archivos de imagen
            />
          </div> */}
          {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error si existe */}
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

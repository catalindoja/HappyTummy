import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from '../config/proxy.js';
import './ProductCard.css';
import Gluten from "../img/allergens/gluten.png";
import Lactose from "../img/allergens/leche.png";
import Eggs from "../img/allergens/huevo.png";
import Fish from "../img/allergens/pescado.png";
import Peanuts from "../img/allergens/cacahuetes.png";
import Soy from "../img/allergens/soja.png";
import Nuts from "../img/allergens/frutossecos.png";
import Seafood from "../img/allergens/marisco.png";
import Molluscs from "../img/allergens/moluscos.png";
import Mustard from "../img/allergens/mostaza.png";
import Celery from "../img/allergens/apio.png";
import Sulphites from "../img/allergens/sulfitos.png";
import Sesame from "../img/allergens/sesamo.png";
import Lupins from "../img/allergens/altramuces.png";

// ProductCard component
function ProductCard(props) {

    // Every allergne has an icon and a name
    const allergenIcons = {
        Gluten,
        Lactose,
        Eggs,
        Fish,
        Peanuts,
        Soy,
        Nuts,
        Seafood,
        Molluscs,
        Mustard,
        Celery,
        Sulphites,
        Sesame,
        Lupins,
    };

    // Limit description text
    const limitText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        } else {
            return text.slice(0, limit) + "...";
        }
    };

    // Interpret descriptions
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    // - allergies: an array that contains the details of the allergies of the post
    const [allergies, setAllergies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtain productallergies and allergies
                const res3 = await axios.get(`${BACKEND_API_URL}/productallergies/`);
                //console.log(res3)
                const filteredProductallergies = res3.data.filter((productallergies) => productallergies.idproduct == props.id);

                // Obtain the IDs of the allergies
                const allergyIds = filteredProductallergies.map((productallergy) => productallergy.idallergies);
                const res4 = await axios.get(`${BACKEND_API_URL}/allergies/`);
                //console.log(res4)
                const filteredAllergies = res4.data.filter((allergy) => allergyIds.includes(allergy.id));
                setAllergies(filteredAllergies);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [props.id]);

    return (
        <Link to={`/app/products/${props.id}`} className="card mb-2 d-flex card-general">
            <img
                src={props.image}
                className="card-img-top card-image"
                alt={props.title}
            />
            <div className="card-body">
                <div className="card-miniheader">
                    <h5 className="afw-bold card-title">{props.title}</h5>
                    {/* <img src={heart} className="card-heart-icon" alt="Heart" />
                    <div className="likes-count">{props.likes}</div> */}
                </div>

                {/* Description of the product */}
                {/* <p className="card-text">{limitText(getText(props.desc), 100)}</p> */}

                <div className="allergens-contains">
                    {allergies.length === 0 ? (
                        <p className="card-text">This product is safe for all allergies and intolerances ❤</p>
                    ) : (
                        allergies.map((allergy, index) => (
                            <img
                                className="fancy-allergy-icon"
                                key={index}
                                src={allergenIcons[allergy.allergy_name]}
                                alt={allergy.allergy_name}
                            />
                        ))
                    )}
                </div>

                {/* <a href={`/app/products/${props.id}`} className="btn btn-primary card-button">Read more</a> */}
            </div>
        </Link>
    );
};

// Exporting ProductCard component
export default ProductCard;
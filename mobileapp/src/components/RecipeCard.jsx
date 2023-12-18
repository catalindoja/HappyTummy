import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import heart from '../img/heart.png';
import './RecipeCard.css';

// RecipeCard component
function RecipeCard(props) {

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

    return (
        <Link to={`/app/recipes/${props.id}`} className="card mb-2 d-flex card-general">
            <img
                src={props.image}
                className="card-img-top card-image"
                alt={props.title}
            />
            <div className="card-body">
                <div className="card-miniheader">
                    <h5 className="afw-bold card-title">{props.title}</h5>
                    {/* <img src={heart} className="card-heart-icon" alt="Heart" /> */}
                </div>
                <p className="card-text">{limitText(getText(props.desc), 90)}</p>

                {/* <a href={`/app/recipes/${props.id}`} className="btn btn-primary card-button">Read more</a> */}

            </div>
        </Link>
    );
};

// Exporting RecipeCard component
export default RecipeCard;
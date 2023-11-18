import React, { useState } from 'react';
import heart from '../img/heart.png';
import './RecipeCard.css';

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
        <div className="card mb-2 d-flex card-border" style={{ width: "18rem;" }}>
            <img src={props.image} className="card-img-top" alt={props.title} />
            <div className="card-body">
                <div className="card-header">
                    <h5 className="card-title afw-bold">{props.title}</h5>
                    <img src={heart} className="heart-icon" alt="Heart" />
                </div>
                <p className="card-text">{limitText(getText(props.desc), 100)}</p>
                <a href={`/app/recipes/${props.id}`} className="btn btn-primary blue-button">Read more</a>
            </div>
        </div>
    );
};


export default RecipeCard;
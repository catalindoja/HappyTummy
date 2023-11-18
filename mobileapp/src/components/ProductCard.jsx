import React, { useState } from 'react';
import heart from '../img/heart.png';
import './ProductCard.css';

function ProductCard(props) {

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
        <div className="card mb-2 d-flex card-border" style={{ width: "15rem;" }}>
            <img
                src={props.image}
                className="card-img-top"
                alt={props.title}
                style={{ objectFit: "cover", height: "200px", borderRadius: "8px" }}
            />
            <div className="card-body">
                <div className="card-header">
                    <h5 className="afw-bold card-title">{props.title}</h5>
                    <img src={heart} className="heart-icon" alt="Heart" />
                </div>
                <p className="card-text">{limitText(getText(props.desc), 100)}</p>
                <a href={`/app/products/${props.id}`} className="btn btn-primary blue-button">Read more</a>
            </div>
        </div>
    );
};


export default ProductCard;
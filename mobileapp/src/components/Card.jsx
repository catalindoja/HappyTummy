import React, { useState } from 'react';

function Card(props) {

    return(
        <div className="card mb-2" style={{width: "18rem;"}}>
            <img src={props.image} className="card-img-top" alt={props.alt} />
            <div className="card-body">
                <h5 className="card-title fw-bold">{props.title}</h5>
                <p className="card-text">{props.text}</p>
                <a href={props.link} className="btn btn-primary">Go to {props.title}</a>
            </div>
        </div>
    );
};


export default Card;
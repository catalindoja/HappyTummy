import Homeimage from "../img/homeimage.jpg";
import Logo from "../img/logo.png";
import FoodContent from "../img/foodcontent.jpeg";
import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom";
import { Popup } from "@progress/kendo-react-popup";
import Card from "../components/ProductCard";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const Test = () => {

    const cardsinfo = [
        {
            "image": "https://galleria.riza.it/files/article/nelle-uova-una-miniera-di-sostanze-utili.jpg",
            "title": "Huevos Rancheros",
            "desc": "Huevos Rancheros de los buenos papi",
            "id": "100"
        },
    ]


    // Obtaining the text
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    // Obtain products and allergies
    const [posts, setPosts] = useState([]);
    const [allergies, setAllergies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/products`);
                console.log(res.data);
                setPosts(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="container Welcome">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>


            <p>JUST TEST</p>
            <button type="button" className="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                Popover on top
            </button>


            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="maintitles">Posts ✨</h4>
            <div>
                <div className="card-container">
                    {cardsinfo.map(card => (
                        <Card
                            image={card.image}
                            title={card.title}
                            desc={card.desc}
                            id={card.id}
                        />
                    ))}
                </div>
            </div>

            <h4 className="maintitles">Posts ✨</h4>
            <div>
                <div className="card-container">
                    {posts.map(post => (
                        <Card
                            image={post.image_url}
                            title={post.product_name}
                            desc={post.product_description}
                            id={post.id}
                        />
                    ))}
                </div>
            </div>
        </div>

    )
};

export default Test;
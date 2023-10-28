import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import Arrow from "../img/arrow.png";

const SingleMarket = () => {
    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const likes = 0;
    const postId = location.pathname.split("/")[2];


    // Obtener información del market
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/markets/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    // Eliminar market
    const handleDelete = async () => {
        try {
            await axios.delete(`/markets/${post.id}`);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    // Obtener texto
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    // Lo que se muestra en pantalla
    return (
        <div className="single">
            <div className="content">
                <Link to="#" onClick={() => window.history.back()}>
                    <img className="arrow-img" src={Arrow} alt="" />
                </Link>
                <img className="super-image" src={post.image_url} alt="" />
                <h1>{post.name}</h1>
                <p className="item-value" dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.description),
                }}>
                </p>
                <div>
                    <div className="market-table">
                        <div className="data">
                            <div className="item">
                                <span className="item-title">City: </span>
                                <span className="item-value">{post.city}</span>
                            </div>
                            <div className="item">
                                <span className="item-title">Address: </span>
                                <span className="item-value">{post.address}</span>
                            </div>
                            <div className="item">
                                <span className="item-title">Zip code: </span>
                                <span className="item-value">{post.zipcode}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default SingleMarket;
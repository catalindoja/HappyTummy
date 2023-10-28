import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Arrow from "../img/arrow.png";

// Create the SingleMarket component
const SingleMarket = () => {

    const [post, setPost] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];

    // Obtaining the market
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

    // Delete the market
    const handleDelete = async () => {
        try {
            await axios.delete(`/markets/${post.id}`);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    // Obtaining the text
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    // Render the SingleMarket component
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

// Export the SingleMarket component
export default SingleMarket;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import ProfilePicture from "../img/profile.png";
import Heart from "../img/heart.png";
import Arrow from "../img/arrow.png";
import Menu from "../components/MenuRecipes";
import axios from "axios";
import DOMPurify from "dompurify";

// Create the SingleRecipe component
const SingleRecipe = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];
    const [post, setPosts] = useState([]);

    // Current user
    const { currentUser } = useContext(AuthContext);
    const idCurrent = currentUser.id;
    const usernameCurrent = currentUser.username;

    // Owner of the post
    const idOwner = post.iduser;
    const [userOwner, setOwner] = useState("");

    // Obtaining the recipe
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Recepie
                const res = await axios.get(`/recipes/${postId}`);
                setPosts(res.data);

                // Ownwer
                const response = await axios.get(`/users/${idOwner}`);
                setOwner(response.data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId, idOwner]);

    // Obtaining the text
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    // Delete the recipe
    const handleDelete = async () => {
        try {
            const productResponse = await axios.delete(`/recipes/${post.id}`);
            navigate("/")
        } catch (err) {
            if (err.response) {
                console.log("Respuesta del servidor con estado de error:", err.response.status);
            } else if (err.request) {
                console.log("La solicitud se realizó, pero no se recibió respuesta del servidor.");
            } else {
                console.log("Error al configurar la solicitud:", err.message);
            }
        }
    }

    // Like button
    const handleLikeClick = async (commentId) => {
        console.log("Like button clicked");
        try {

        } catch (err) {
            console.error(err);
        }
    };

    // Render the SingleRecipe component
    return (
        <div>
            <div className="single">
                <div className="content">
                    <Link to="#" onClick={() => window.history.back()}>
                        <img className="arrow-img" src={Arrow} alt="" />
                    </Link>
                    <img className="super-image" src={post.image_url} alt="" />
                    <div className="user">
                        <img src={ProfilePicture} />
                        <div className="info">
                            <span className="username">{userOwner.username}</span>
                        </div>
                        {currentUser.username === userOwner.username ? (
                            <><div className="edit">
                                <Link to={`/editpost`} state={post}>
                                    <img className="editimg" src={Edit} alt="" />
                                </Link>
                                <img className="delete" onClick={handleDelete} src={Delete} alt="" />
                            </div> </>
                        ) : (
                            <div className="like">
                                <button onClick={handleLikeClick}>
                                    <img src={Heart} alt="Heart Icon" className="heart-icon" />
                                    <span className="likes-count">{post.likes}</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <h1>{post.title}</h1>
                    <h3 className="more-data-heading">Specifications</h3>
                    <div className="more-data-container">
                        <div className="more-data-item">
                            <span className="more-data-label">Time:</span>
                            <span className="more-data-value">{post.time} {post.unit}</span>
                        </div>
                        <div className="more-data-item">
                            <span className="more-data-label">Number of people:</span>
                            <span className="more-data-value">{post.ammountofpeople} people</span>
                        </div>
                    </div>
                    <h3 className="more-data-heading">Description</h3>
                    <p className="description"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.description),
                        }}
                    ></p>
                    <h3 className="more-data-heading">Steps</h3>
                    <p className="description"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.steps),
                        }}
                    ></p>
                </div>

                {<Menu />}
            </div>
        </div>
    );
}

// Export the SingleRecipe component
export default SingleRecipe;

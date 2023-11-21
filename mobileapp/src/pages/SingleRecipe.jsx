import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import ProfilePicture from "../img/profile.png";
import Heart from "../img/heart.png";
import Arrow from "../img/arrow.png";
import axios from "axios";
import DOMPurify from "dompurify";
import ReactQuill from 'react-quill';
import "./SingleRecipe.css";
import { BACKEND_API_URL } from '../config/proxy.js';

// Create the SingleRecipe component
const SingleRecipe = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[3];
    const [post, setPosts] = useState([]);

    // Current user
    // const { currentUser } = useContext(AuthContext);
    // const idCurrent = currentUser.id;
    // const usernameCurrent = currentUser.username;

    // Owner of the post
    const idOwner = post.iduser;
    const [userOwner, setOwner] = useState("");

    // - comments: an array that contains the details of the comments of the post
    // - userComments: an object that contains the details of the users who wrote the comments
    const [comments, setComments] = useState([]);
    const [userComments, setUserComments] = useState({});

    // Write new comment
    const state = useLocation().state;
    const [value, setValue] = useState(state?.newComment || "");

    useEffect(() => {
        const fetchData = async () => {

            try {
                // Obtain comments
                const res = await axios.get(`${BACKEND_API_URL}/commentrecipes/`);
                const filteredComments = res.data.filter((comment) => comment.idrecipe == postId);
                setComments(filteredComments);

                // Obtain users who wrote the comments
                const userPromises = filteredComments.map((comment) => axios.get(`${BACKEND_API_URL}/users/${comment.iduser}`));
                const userResponses = await Promise.all(userPromises);

                // Create an object that contains the details of the users who wrote the comments
                const userCommentsData = {};
                userResponses.forEach((response, index) => {
                    const comment = filteredComments[index];
                    userCommentsData[comment.id] = response.data;
                });

                // Set the state variable 'userComments' to the object that contains the details of the users who wrote the comments
                setUserComments(userCommentsData);

            } catch (err) {
                //console.log(err);
            }
        };

        fetchData();
    }, [postId, idOwner]);

    // Obtaining the recipe
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Recepie
                const res = await axios.get(`${BACKEND_API_URL}/recipes/${postId}`);
                console.log(res)
                setPosts(res.data);

                // Ownwer
                const response = await axios.get(`${BACKEND_API_URL}/users/${idOwner}`);
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
            const productResponse = await axios.delete(`${BACKEND_API_URL}/recipes/${post.id}`);
            navigate("/app/home")
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
                        {/* {currentUser.username === userOwner.username ? (
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
                        )} */}
                    </div>
                    <h4 className="recipe-name">{post.title}</h4>
                    <h3 className="specifications-heading">Specifications</h3>
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
                    <h3 className="steps-heading mb-3">Steps</h3>
                    <p className="description"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.steps),
                        }}
                    ></p>


                    <h3 className="comments-heading">Comments</h3>
                    <ul className="comments-list">
                        {comments.length === 0 ? (
                            <p>No comments yet!</p>
                        ) : (
                            comments.map(comment => (
                                <li key={comment.id} className="comment">
                                    <div className="comment-content">
                                        <div className="user-info">
                                            <img src={ProfilePicture} alt="Profile Picture" className="user-image" />
                                            <span className="username">
                                                {userComments[comment.id] ? userComments[comment.id].username : "Unknown"}
                                            </span>
                                        </div>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(comment.content)
                                            }}
                                        ></p>
                                    </div>
                                    <div className="comment-likes">
                                        <button className="comment-likes-button" onClick={handleLikeClick}>
                                            <img src={Heart} alt="Heart Icon" className="heart-icon" />
                                        </button>
                                        <span className="likes-count">{comment.likes}</span>
                                    </div>
                                </li>
                            )
                            ))}
                    </ul>

                    <h3 className="write-comment-heading">Write a new comment!</h3>
                    <div className="editorContainer">
                        <ReactQuill
                            placeholder="New comment"
                            className="editor"
                            theme="snow"
                            value={value}
                            onChange={setValue}
                        />
                    </div>
                </div>

                {/* MENU HERE */}
            </div>
        </div>
    );
}

// Export the SingleRecipe component
export default SingleRecipe;

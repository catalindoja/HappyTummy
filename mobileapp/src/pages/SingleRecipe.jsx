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
import moment from "moment";
import "./SingleRecipe.css";
import { BACKEND_API_URL } from '../config/proxy.js';
import Modal from 'react-modal';
import arrowImage from "../img/arrow.png";
import warning from "../img/warning.png";

// SingleRecipe component
const SingleRecipe = () => {

    // Location and navigation
    const location = useLocation();
    const navigate = useNavigate();

    // Post id
    const postId = location.pathname.split("/")[3];
    const [post, setPosts] = useState([]);

    // Current user
    const { currentUser } = useContext(AuthContext);
    const idCurrent = currentUser.id;
    const usernameCurrent = currentUser.username;

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

    const likes = 0;
    // Post comment
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/commentrecipes/`, {
                iduser: idCurrent,
                idrecipe: postId,
                content: value,
                likes,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    };

    // Report error modal
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const openModal2 = () => {
        setModalIsOpen2(true);
    };
    const closeModal2 = () => {
        setModalIsOpen2(false);
    };

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

    // Delete the recipe
    const handleDelete = async () => {
        try {
            await axios.delete(`${BACKEND_API_URL}/recipes/${post.id}`);
            navigate("/app/profile")
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
    const handleLikeClick = async (postId) => {
        console.log("Like button clicked");
        try {
            await axios.patch(`/recipes/${postId}`, {
                likes: post.likes + 1,
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    // Comments like button
    const handleCommentLikeClick = async (commentId, commentLikes) => {
        try {
            await axios.patch(`/commentrecipes/${commentId}`, {
                likes: commentLikes + 1,
            });

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    };

    // Modal pop-up
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Render the SingleRecipe component
    return (
        <div>
            <div className="single-recipe">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
                <div className="content">
                    <Link to="#" onClick={() => window.history.back()}>
                        <img className="arrow-img" src={Arrow} alt="" />
                    </Link>
                    <div className="user">
                        <img src={ProfilePicture} alt="" />
                        <Link to={`/app/user/${userOwner.id}`} className="info">
                            <span className="username">{userOwner.username}</span>
                        </Link>
                        {currentUser.username === userOwner.username ? (
                            <><div className="edit">
                                <Link to={`/app/editrecipe/${postId}`} state={post}>
                                    <img className="editimg" src={Edit} alt="" />
                                </Link>

                                <img className="delete" onClick={openModal} src={Delete} alt="" />
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    shouldCloseOnOverlayClick={true}
                                    shouldCloseOnEsc={true}
                                    className="modal-content"
                                    overlayClassName="modal-overlay"
                                >
                                    <div>
                                        <span className="premium-description">
                                            <p className="premium-text"
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize("Are you sure you want to delete this post?")
                                                }}
                                            ></p>
                                        </span>
                                        <div className="popup-confirm-buttons">
                                            <button className="cancel-button" onClick={closeModal}>
                                                Cancel
                                            </button>
                                            <button className="confirm-button" onClick={handleDelete}>
                                                Confirm
                                            </button>
                                        </div>
                                        <img
                                            src={arrowImage}
                                            alt="Close"
                                            className="close-icon"
                                            onClick={closeModal}
                                        />
                                    </div>
                                </Modal>

                            </div> </>
                        ) : (
                            <div>
                                <img className="delete" onClick={openModal2} src={warning} alt="" />
                                <Modal
                                    isOpen={modalIsOpen2}
                                    onRequestClose={closeModal2}
                                    shouldCloseOnOverlayClick={true}
                                    shouldCloseOnEsc={true}
                                    className="modal-content"
                                    overlayClassName="modal-overlay"
                                >
                                    <div>
                                        <span className="premium-description">
                                            <p className="premium-text"
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize("Report an error in this post ⚠")
                                                }}
                                            ></p>
                                        </span>

                                        <div className="editorContainer-write">
                                            <ReactQuill
                                                modules={{
                                                    toolbar: false, // Desactiva la barra de herramientas
                                                    clipboard: { matchVisual: false }, // Desactiva las operaciones de copiar y pegar con formato
                                                }}
                                            />
                                        </div>

                                        <div className="popup-confirm-buttons">
                                            <button className="cancel-button" onClick={closeModal2}>
                                                Cancel
                                            </button>
                                            <button className="confirm-button" onClick={closeModal2}>
                                                Confirm
                                            </button>
                                        </div>
                                        <img
                                            src={arrowImage}
                                            alt="Close"
                                            className="close-icon"
                                            onClick={closeModal2}
                                        />
                                    </div>
                                </Modal>
                            </div>
                        )}
                    </div>
                    <div class="super-image-container">
                        <img className="recipe-image" src={post.image_url} alt="" />
                    </div>
                    <div className="single-header">
                        <h1 className="product-name my-3">{post.title}</h1>
                        <button className="like" onClick={() => handleLikeClick(postId)}>
                            <img src={Heart} alt="Heart Icon" className="heart-icon" />
                            <div className="likes-count">{post.likes}</div>
                        </button>
                    </div>
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
                                            <img src={ProfilePicture} alt="" className="user-image" />
                                            <Link to={`/app/user/${userComments[comment.id] ? userComments[comment.id].id : "Unknown"}`} className="username">
                                                {userComments[comment.id] ? userComments[comment.id].username : "Unknown"}
                                            </Link>
                                            <button className="comment-likes" onClick={() => handleCommentLikeClick(comment.id, comment.likes)}>
                                                <img src={Heart} alt="Heart Icon" className="heart-icon" />
                                                <div className="likes-count">{comment.likes}</div>
                                            </button>
                                        </div>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(comment.content)
                                            }}
                                        ></p>
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
                            modules={{
                                toolbar: {
                                    container: [
                                        ["bold", "italic", "underline"],
                                    ],
                                },
                                clipboard: { matchVisual: false },
                                mention: false,
                            }}
                        />
                    </div>

                    <div className="comment-button">
                        <button className="publishcomment-button" onClick={handleClick}> Publish</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

// Export the SingleRecipe component
export default SingleRecipe;

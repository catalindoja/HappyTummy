import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import ProfilePicture from "../img/profile.png";
import Heart from "../img/heart.png";
import Reply from "../img/reply.png";
import Arrow from "../img/arrow.png";
import Menu from "../components/MenuRecipes";
import axios from "axios";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";

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

    // - comments: an array that contains the details of the comments of the post
    // - userComments: an object that contains the details of the users who wrote the comments
    const [comments, setComments] = useState([]);
    const [userComments, setUserComments] = useState({});

    // Owner of the post
    const idOwner = post.iduser;
    const [userOwner, setOwner] = useState("");

    // Write new comment
    const state = useLocation().state;
    const [value, setValue] = useState(state?.newComment || "");
    
    // Post comment
    const handleClick = async (e) => {
        e.preventDefault();
        try {
        const productResponse = await axios.post(`/commentrecipes/`, {
            iduser: idCurrent,
            idproduct: postId,
            content: value,
            likes: 0
        });

        window.location.reload();

        } catch (err) {
        console.log(err);
        }
    }

    // Add state variables for handling reply functionality
    const [replyingTo, setReplyingTo] = useState(null); // To store the ID of the comment being replied to
    const [replyContent, setReplyContent] = useState(""); // To store the content of the reply
    const [isReplyVisible, setIsReplyVisible] = useState(false);

    // Inside your functional component
    const replyContainerRef = useRef(null);

    // Use useEffect to trigger the scroll when isReplyVisible changes
    useEffect(() => {
        if (isReplyVisible && replyContainerRef.current) {
        replyContainerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        }
    }, [isReplyVisible]);

    // Function to handle opening the reply pop-up
    const handleReply = (commentId, username) => {
        setReplyingTo(commentId);
        setIsReplyVisible(true);
    };

    // Function to handle submitting the reply
    const submitReply = async () => {
        try {
        // Send the reply to the backend
        await axios.post(`/commentrecipes/`, {
            iduser: idCurrent,
            idrecipe: postId,
            content: replyContent,
            likes: 0, // Assuming initial likes count is 0
            idparent: replyingTo, // Add the ID of the comment being replied to
        });
        // Close the modal/pop-up and reset state variables
        setIsReplyVisible(false);
        setReplyingTo(null);
        setReplyContent("");
        // Refresh comments or update state to include the new reply

        window.location.reload();
        } catch (err) {
        console.log(err);
        }
    };

    const closeReplyModal = () => {
        setIsReplyVisible(false);
        setReplyingTo(null);
        setReplyContent("");
    };

    // Obtaining the recipe
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtain comments
                const res2 = await axios.get(`/commentrecipes/`);
                console.log(res2.data)
                const filteredComments = res2.data.filter((comment) => comment.idrecipe == postId);
                console.log(postId)
                setComments(filteredComments);
                console.log(filteredComments)

                // Obtain users who wrote the comments
                const userPromises = filteredComments.map((comment) => axios.get(`/users/${comment.iduser}`));
                const userResponses = await Promise.all(userPromises);

                // Create an object that contains the details of the users who wrote the comments
                const userCommentsData = {};
                userResponses.forEach((response, index) => {
                const comment = filteredComments[index];
                userCommentsData[comment.id] = response.data;
                });

                // Set the state variable 'userComments' to the object that contains the details of the users who wrote the comments
                setUserComments(userCommentsData);


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

    // Comment like button
    const handleCommentLikeClick = async (commentId, commentLikes) => {
      try {
        const commentResponse = await axios.patch(`/comments/${commentId}`, {
          likes: commentLikes + 1,
        });
  
        window.location.reload();
  
      } catch (err) {
        console.log(err);
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
                                <Link to={`/editrecipe/${post.id}`} state={post}>
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
                    <h3 className="more-data-heading">Steps</h3>
                    <p className="description"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.description),
                        }}
                    ></p>

                    <h3 className="comments-heading">Comments</h3>
                    <ul className="comments-list">
                    {comments.length === 0 ? (
                        <p>No comments yet!</p>
                    ) : (
                        comments.map(comment => {
                        const parentComment = comments.find(c => c.id === comment.idparent);
                        
                        return (
                            <li key={comment.id} className="comment">
                            <div className="comment-content">
                                <div className="user-info">
                                <img src={ProfilePicture} alt="Profile Picture" className="user-image" />
                                <span className="username">
                                    {userComments[comment.id] ? userComments[comment.id].username : "Unknown"}
                                    {comment.idparent && parentComment && (
                                    <> replied to {userComments[parentComment.id]?.username}</>
                                    )}
                                </span>
                                </div>
                                <p
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(comment.content)
                                }}
                                ></p>
                            </div>
                                <button className="comment-likes-component" onClick={() => handleCommentLikeClick(comment.id, comment.likes)}>
                                    <img src={Heart} alt="Heart Icon" className="heart-icon" />
                                    <div className="likes-count-component">{comment.likes}</div>
                                </button>
                            </li>
                        );
                        }
                        ))}
                    </ul>

                    {isReplyVisible && (
                    <div ref={replyContainerRef} className="reply-container">
                        <div className="reply-header">
                        <span>Replying to: {userComments[replyingTo]?.username}</span>
                        </div>
                        <div className="reply-body">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            className="reply-textarea"
                        />
                        <div className="reply-buttons">
                            <button onClick={submitReply} className="submit-reply-button">Submit</button>
                            <button onClick={closeReplyModal} className="cancel-reply-button">Cancel</button>
                        </div>
                        </div>
                    </div>
                    )}

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

                    <div className="buttons">
                    <button onClick={handleClick}> Publish</button>
                    </div>
                </div>
                {<Menu />}
            </div>
        </div>
    );
}

// Export the SingleRecipe component
export default SingleRecipe;

import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import ProfilePicture from "../img/profile.png";
import Heart from "../img/heart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/MenuRecipes";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";

const SingleRecipe = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const likes = 0;
    const postId = location.pathname.split("/")[2];

    // Obtener usuario actual
    const { currentUser } = useContext(AuthContext);
    const idCurrent = currentUser.id;
    const usernameCurrent = currentUser.username;

    // Obtener post
    const [post, setPosts] = useState([]);

    // Usuario propietario del post
    const idOwner = post.iduser;
    const [userOwner, setOwner] = useState("");

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

    // Obtener texto
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    // Eliminar receta
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

    // Botón de like
    const handleLikeClick = async (commentId) => {
        console.log("Like button clicked");
        try {

        } catch (err) {
            console.error(err);
        }
    };

    // Lo que se muestra en pantalla
    return (
        <div>
            <div className="single">
                <div className="content">
                    {/* <img src={`../upload/${post?.image}`} alt="" /> */}
                    <img className="super-image" src={post.image_url} alt="" />
                    <div className="user">
                        <img src={ProfilePicture} />
                        {/* {userOwner.userImg && <img src={userOwner.userImg} alt="" />} */}
                        <div className="info">
                            <span className="username">{userOwner.username}</span>
                            {/* <p>Posted {moment(post.date).fromNow()}</p> */}
                        </div>
                        {currentUser.username === userOwner.username ? (
                            <><div className="edit">
                                <Link to={`/editpost`} state={post}>
                                    <img className="editimg" src={Edit} alt="" />
                                </Link>
                                <img className="delete" onClick={handleDelete} src={Delete} alt="" />
                            </div> </>
                        ) : (
                            // Botón "like" para usuarios que no son propietarios del post
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
                </div>

                {<Menu/>}
            </div>
        </div>
    );
}

export default SingleRecipe;

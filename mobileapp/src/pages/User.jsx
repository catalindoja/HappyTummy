import Teal from "../img/teal.png";
import Profilepic from "../img/profile.png";
import Edit from "../img/edit.png";
import './User.css';
import backgroundImage from "../img/clearbackground.png";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import Logo2 from "../img/logo2.png";
import { useTranslation } from 'react-i18next';
import { BACKEND_API_URL } from '../config/proxy.js';
import Modal from 'react-modal';
import arrowImage from "../img/arrow.png";
import BackArrow from "../components/BackArrow";

function Profile() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Obtaining the current user
    const { currentUser } = useContext(AuthContext);

    // Obtain user id from url
    const location = useLocation();
    const userId = location.pathname.split("/")[3];

    // Obtain user info
    let [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/users/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    // Obtain his products
    let [hisproducts, setHisproducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/products`);
                console.log(res.data);
                setHisproducts(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    hisproducts = hisproducts.filter((post) => post.iduser === user.id)

    // Obtain his recipes
    let [hisrecipes, setHisrecipes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/recipes`);
                console.log(res.data);
                setHisrecipes(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    hisrecipes = hisrecipes.filter((post) => post.iduser === user.id)

    // Estado para controlar si el usuario está siguiendo al perfil actual
    const [isFollowing, setIsFollowing] = useState(false);

    // Verificar si el usuario actual ya sigue al perfil actual
    useEffect(() => {
        const checkIfFollowing = async () => {
            try {
                const followCheckResponse = await axios.get(`${BACKEND_API_URL}/followers/${user.id}/${currentUser.id}`);
                console.log("xd")
                console.log(followCheckResponse.data.length);
                // Verificar si el array tiene al menos un elemento
                setIsFollowing(followCheckResponse.data.length > 0);
            } catch (err) {
                console.log(err);
            }
        };
        checkIfFollowing();
    }, [currentUser.id, user.id])

    // Función para seguir o dejar de seguir al usuario
    const toggleFollow = async (e) => {
        e.preventDefault();
        try {
            if (!isFollowing) {
                // Si no está siguiendo, realiza la operación de seguir
                const followResponse = await axios.post(`${BACKEND_API_URL}/followers/`, {
                    idFollower: currentUser.id,
                    idFollowed: user.id
                });
                console.log(followResponse);
                setIsFollowing(true);
            } else {
                // Si ya está siguiendo, realiza la operación de dejar de seguir
                const unfollowResponse = await axios.delete(`${BACKEND_API_URL}/followers/${user.id}/${currentUser.id}`);
                console.log(unfollowResponse);
                setIsFollowing(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="profile-content">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
            <BackArrow />

            <div className="user-header">
                <img className="profile-profilepic" src={Profilepic} alt="" />
                {user.premium == 0 ? (
                    <h6 className="profile-username">{user.username}</h6>
                ) : (
                    <h6 className="profile-username-premium">{user.username + " ⭐"}</h6>
                )}

                <button className="follow-button" onClick={toggleFollow}>
                    {isFollowing ? "Following" : "Follow"}
                </button>

            </div>

            <h5 className="profile-maintitles"> Products <span className="icon2">🛒</span></h5>
            {hisproducts.length === 0 ? (
                <h4 className="no-post-prod">No products yet 👻</h4>
            ) : (
                <div>
                    <div className="card-container">
                        {hisproducts.map(post => (
                            <ProductCard
                                image={post.image_url}
                                title={post.product_name}
                                desc={post.product_description}
                                id={post.id}
                            />
                        ))}
                    </div>
                </div>
            )}

            <h5 className="profile-maintitles"> Recipes <span className="icon2">🥧</span></h5>
            {hisrecipes.length === 0 ? (
                <h4 className="no-post-rec">No recipes yet 👻</h4>
            ) : (
                <div>
                    <div className="card-container">
                        {hisrecipes.map(post => (
                            <RecipeCard
                                image={post.image_url}
                                title={post.title}
                                desc={post.description}
                                id={post.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;

import Teal from "../img/teal.png";
import Profilepic from "../img/profile.png";
import Edit from "../img/edit.png";
import './Profile.css';
import backgroundImage from "../img/clearbackground.png";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo2 from "../img/logo2.png";
import { useTranslation } from 'react-i18next';
import { BACKEND_API_URL } from '../config/proxy.js';

function Profile() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // Obtaining the current user
    const { currentUser } = useContext(AuthContext);

    const handleEditProfile = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user.id)
        navigate("/app/editprofile/"+user.id);
    }

    // Obtain products
    let [myproducts, setMyproducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/products`);
                console.log(res.data);
                setMyproducts(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    myproducts = myproducts.filter((post) => currentUser && post.iduser === currentUser.id)

    // Obtain recipes
    let [myrecipes, setMyrecipes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/recipes`);
                console.log(res.data);
                setMyrecipes(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    myrecipes = myrecipes.filter((post) => currentUser && post.iduser === currentUser.id)

    return (
        <div className="profile_content">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>

            <div className="profile_card">
                <img className="profilepic" src={Profilepic} alt="" />
                <h6 className="username">{currentUser.username}</h6>
                <div class="alert alert-warning" role="alert">
                    Go premium!
                </div>
                <img className="edit" src={Edit} onClick={handleEditProfile} alt="" />
            </div>

            <h5 className="maintitles">{t('my_products')} <span className="icon2">🛒</span></h5>
            <div>
                <div className="card-container">
                    {myproducts.map(post => (
                        <ProductCard
                            image={post.image_url}
                            title={post.product_name}
                            desc={post.product_description}
                            id={post.id}
                        />
                    ))}
                </div>
            </div>

            <h5 className="maintitles">{t('my_recipes')} <span className="icon2">🥧</span></h5>
            <div>
                <div className="card-container">
                    {myrecipes.map(post => (
                        <RecipeCard
                            image={post.image_url}
                            title={post.title}
                            desc={post.description}
                            id={post.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;

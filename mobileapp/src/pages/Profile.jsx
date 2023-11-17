import Teal from "../img/teal.png";
import Profilepic from "../img/profile.png";
import Edit from "../img/edit.png";
import './Profile.css';
import backgroundImage from "../img/clearbackground.png";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import RecipeCard from "../components/RecipeCard";

import { AuthContext } from "../context/authContext";

function Profile() {

    // Obtaining the current user
    const { currentUser } = useContext(AuthContext);

    // Obtain products
    let [myproducts, setMyproducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/products`);
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
                const res = await axios.get(`/recipes`);
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
                <h4 className="username">{currentUser.username}</h4>
                <div class="alert alert-warning" role="alert">
                    Go premium!
                </div>
                <img className="edit" src={Edit} alt="" />
            </div>

            <h4 className="maintitles">My products 🛒</h4>
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

            <h4 className="maintitles">My recipes 🥧</h4>
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

import Profilepic from "../img/profile.png";
import './User.css';
import BackArrow from "../components/BackArrow";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { AuthContext } from "../context/authContext.js";
import { BACKEND_API_URL } from '../config/proxy.js';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Help from '../img/helpicon.png';

import Gluten from "../img/allergens/gluten.png";
import Lactose from "../img/allergens/leche.png";
import Eggs from "../img/allergens/huevo.png";
import Fish from "../img/allergens/pescado.png";
import Peanuts from "../img/allergens/cacahuetes.png";
import Soy from "../img/allergens/soja.png";
import Nuts from "../img/allergens/frutossecos.png";
import Seafood from "../img/allergens/marisco.png";
import Molluscs from "../img/allergens/moluscos.png";
import Mustard from "../img/allergens/mostaza.png";
import Celery from "../img/allergens/apio.png";
import Sulphites from "../img/allergens/sulfitos.png";
import Sesame from "../img/allergens/sesamo.png";
import Lupins from "../img/allergens/altramuces.png";

// User profile page
function User() {

    // Every allergne has an icon and a name
    const allergenIcons = {
        Gluten,
        Lactose,
        Eggs,
        Fish,
        Peanuts,
        Soy,
        Nuts,
        Seafood,
        Molluscs,
        Mustard,
        Celery,
        Sulphites,
        Sesame,
        Lupins,
    };

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
    }, [userId]);

    // Obtain his products
    let [hisproducts, setHisproducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/products`);
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
                setHisrecipes(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    hisrecipes = hisrecipes.filter((post) => post.iduser === user.id)

    // Obtain allergies of the user
    const [hisallergies, setHisallergens] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            // Obtains allergies of the current user
            const everyallergenuser = await axios.get(`${BACKEND_API_URL}/userallergies/`);
            const hisallergenuser = everyallergenuser.data.filter((userallergies) => userallergies.iduser == user.id);

            const allergensName = await axios.get(`${BACKEND_API_URL}/allergies/`);

            // Extract ids from hisallergenuser
            const allergyIds = hisallergenuser.map((userallergy) => userallergy.idallergy);

            // Filter allergensName based on extracted ids
            const filteredAllergies = allergensName.data.filter((allergy) => allergyIds.includes(allergy.id));

            setHisallergens(filteredAllergies);
        };
        fetchData();
    }, []);

    // Obtain followers and following
    let [followers, setfollowers] = useState([]);
    let [following, setfollowing] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/followers`);

                // Followers
                const followersData = res.data.filter(entry => entry.idFollowed === user.id);
                setfollowers(followersData);

                // Following
                const followingData = res.data.filter(entry => entry.idFollower === user.id);
                setfollowing(followingData);

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [user.id]);

    // Check if the current user is following the profile user
    const [isFollowing, setIsFollowing] = useState(false);

    // Check if the current user is following the profile user
    useEffect(() => {
        const checkIfFollowing = async () => {
            try {
                const followCheckResponse = await axios.get(`${BACKEND_API_URL}/followers/${user.id}/${currentUser.id}`);
                setIsFollowing(followCheckResponse.data.length > 0);
            } catch (err) {
                console.log(err);
            }
        };
        checkIfFollowing();
    }, [currentUser.id, user.id])

    // Function to toggle the follow button
    const toggleFollow = async (e) => {
        e.preventDefault();
        try {
            if (!isFollowing) {
                const followResponse = await axios.post(`${BACKEND_API_URL}/followers/`, {
                    idFollower: currentUser.id,
                    idFollowed: user.id
                });
                await createNoti();
                setIsFollowing(true);
            } else {
                const unfollowResponse = await axios.delete(`${BACKEND_API_URL}/followers/${user.id}/${currentUser.id}`);
                setIsFollowing(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Create new notification
    const createNoti = async (e) => {
        try {
            const followResponse = await axios.post(`${BACKEND_API_URL}/notifications/`, {
                idReceiver: user.id,
                content: `${currentUser.username} is now following you! 🤝`
            });
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
                {user.premium === 0 ? (
                    <h6 className="profile-username">{user.username}</h6>
                ) : (
                    <h6 className="profile-username-premium">{user.username + " ⭐"}</h6>
                )}

                <button className="follow-button" onClick={toggleFollow}>
                    {isFollowing ? "Following" : "Follow"}
                </button>
            </div>

            <div className="follow-section">
                <Link to={`/app/followers/${user.id}`}>
                    <div className="follower-count">
                        <h5 className="follow-h5">Followers</h5>
                        <p className="follow-p">{followers.length}</p>
                    </div>
                </Link>
                <Link to={`/app/following/${user.id}`}>
                    <div className="following-count">
                        <h5 className="follow-h5">Following</h5>
                        <p className="follow-p">{following.length}</p>
                    </div>
                </Link>
            </div>

            <div className="contains-main-heading">
                <div className="intolerances-title">
                    Intolerances
                </div>
                <Link to={`/app/allergies`}>
                    <img src={Help} alt="Help" className="help-icon-user" />
                </Link>
            </div>
            <div className="user-allergies-logos">
                {hisallergies.length === 0 ? (
                    <p className="intolerances-title">I have no intolerances 😋</p>
                ) : (
                    hisallergies.map((allergy, index) => (
                        <div key={index}>
                            <img
                                className="fancy-allergy-icon-user"
                                src={allergenIcons[allergy.allergy_name]}
                                alt={allergy.allergy_name}
                            />
                        </div>
                    ))
                )}
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

// Exporting the component
export default User;

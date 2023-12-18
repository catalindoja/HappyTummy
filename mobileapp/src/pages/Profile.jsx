import Profilepic from "../img/profile.png";
import Edit from "../img/edit.png";
import './Profile.css';
import backgroundImage from "../img/clearbackground.png";
import Logo2 from "../img/logo2.png";
import Teal from "../img/teal.png";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useTranslation } from 'react-i18next';
import { BACKEND_API_URL } from '../config/proxy.js';
import Modal from 'react-modal';
import arrowImage from "../img/arrow.png";
import DOMPurify from "dompurify";

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

function Profile() {

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

    const { t } = useTranslation(); 
    const navigate = useNavigate();

    // Obtaining the current user
    const { currentUser, setCurrentUser, logout, login, updatePremium } = useContext(AuthContext);

    // Edit profile route
    const handleEditProfile = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user.id)
        navigate("/app/editprofile/" + user.id);
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

    // Modal pop-up
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Make the user premium
    const goPremium = async () => {
        setModalIsOpen(false);
        try {
            await updatePremium();
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    // Premium description
    const premiumDescription =
        '<p><strong>Unlock every Premium Benefits!</strong></p>'
        + '<ul>'
        + '🥇 Get an <strong>EXCLUSIVE</strong> Premium Badge'
        + '</ul>'
        + '<ul>'
        + '🥧 <strong>UNLOCK</strong> post recipes'
        + '</ul>'
        + '<ul>'
        + '🛒 Post <strong>UNLIMITED</strong> products'
        + '</ul>'
        + '<ul>'
        + '✏ Post <strong>UNLIMITED</strong> comments'
        + '</ul>'
        + '<ul>'
        + '❤ Give <strong>UNLIMITED</strong> likes'
        + '</ul>'

        + '<p>And much more!</p>'
        + '<p>Update your account for <strong>4.99€</strong> per month</p>'
        + '<p><strong>Enjoy your Premium account NOW!</strong></p>'
        ;

    // Obtain allergies of the current user
    const [myallergies, setMyallergens] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            // Obtains allergies of the current user
            const everyallergen = await axios.get(`${BACKEND_API_URL}/userallergies/`);
            const myallergens = everyallergen.data.filter((userallergies) => userallergies.iduser == currentUser.id);
            setMyallergens(myallergens);
        };
        fetchData();
    }, []);

    return (
        <div className="profile-content">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>

            <div className="profile-header">
                <img className="profile-profilepic" src={Profilepic} alt="" />
                {currentUser.premium == 0 ? (
                    <h6 className="profile-username">{currentUser.username}</h6>
                ) : (
                    <h6 className="profile-username-premium">{currentUser.username}</h6>
                )}
                <div>
                    {currentUser.premium == 0 ? (
                        <div>
                            <div onClick={openModal} className="profile-premium" role="alert">
                                Go premium!
                            </div>
                        </div>
                    ) : (
                        <div className="premium-star">
                            ⭐
                        </div>
                    )}
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
                                        __html: DOMPurify.sanitize(premiumDescription)
                                    }}
                                ></p>
                            </span>
                            <button className="premium-button" onClick={goPremium}>
                                Make me premium
                            </button>
                            <img
                                src={arrowImage}
                                alt="Close"
                                className="close-icon"
                                onClick={closeModal}
                            />
                        </div>
                    </Modal>
                </div>
                <img className="profile-edit" src={Edit} onClick={handleEditProfile} alt="" />
            </div>

            {/* <div >
                {myallergies.length === 0 ? (
                    <p>I have no intolerances 😋</p>
                ) : (
                    myallergies.map((allergy, index) => (
                        <div>
                            <spam>{allergy.allergy_name}</spam>
                        <img
                            className="fancy-allergy-icon"
                            key={index}
                            src={allergenIcons[allergy.allergy_name]}
                            alt={allergy.allergy_name}
                        />
                        </div>
                    ))
                )}
            </div> */}

            <h5 className="profile-maintitles">{t('my_products')} <span className="icon2">🛒</span></h5>
            {myproducts.length === 0 ? (
                <h4 className="no-post-prod">No products yet 👻</h4>
            ) : (
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
            )}

            <h5 className="profile-maintitles">{t('my_recipes')} <span className="icon2">🥧</span></h5>
            {myrecipes.length === 0 ? (
                <h4 className="no-post-rec">No recipes yet 👻</h4>
            ) : (
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
            )}
        </div>
    );
}

// Exporting Profile component
export default Profile;

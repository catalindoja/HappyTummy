import React, { useState, useEffect, useContext } from "react";
import { BACKEND_API_URL } from '../config/proxy.js';
import { AuthContext } from "../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import Imagehome1 from "../img/imagehome1.jpeg";
import Imagehome2 from "../img/imagehome2.jpeg";
import Imagehome3 from "../img/imagehome3.jpeg";
import Imagehome4 from "../img/imagehome4.jpeg";
import Imagehome5 from "../img/imagehome5.jpeg";
import Imagehome6 from "../img/imagehome6.jpeg";
import backgroundImage from "../img/clearbackground.png";
import Logo from "../img/logo2.png";
import './Home.css';
import Card from "../components/ProductCard";
import ProductCard from "../components/ProductCard";
import RecipeCard from "../components/RecipeCard";
import Noti from "../img/noti.png";

const localImages = [
    require("../img/imagehome1.jpeg"),
    require('../img/imagehome2.jpeg'),
];

// Home component
function Home() {

    const { t } = useTranslation();
    const ProductIds = [27, 21, 43];

    // Obtaining the current user
    const { currentUser } = useContext(AuthContext);
    const idCurrent = currentUser.id;

    // Obtains allergies of the current user
    const [myallergens, setMyallergens] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const everyallergen = await axios.get(`${BACKEND_API_URL}/userallergies/`);
                const myallergens = everyallergen.data.filter((userallergies) => userallergies.iduser == idCurrent);
                setMyallergens(myallergens);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    // Obtain products FILTERED DEPENDING OF THE USER ALLEGIES
    let [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/products`);
                const data = Array.isArray(res.data) ? res.data : [];
                const filteredProducts = data.filter(product => {
                    // Check if product.allergies is defined before calling map
                    const productAllergyIds = (product.allergies || []).map(allergy => allergy.id);
                    return !myallergens.some(userAllergy => productAllergyIds.includes(userAllergy.idallergy));
                });
                const specificProducts = filteredProducts.filter(product => ProductIds.includes(product.id));
                //console.log(res.data);
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [myallergens]);

    // Obtain recipes
    let [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/recipes`);
                //console.log(res.data);
                setRecipes(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    // Limit the number of items to show
    const maxItemsToShow = 3;
    const slicedProducts = products.slice(0, maxItemsToShow);
    const slicedRecipes = recipes.slice(0, maxItemsToShow);
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="home_content" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"></link>

            <div className="home-header">
                <img className="home-header-logo" src={Logo} alt="logo" />
                <h2 className="home-header-text">Welcome {currentUser.username}!</h2>
                <Link to={`/app/notifications/${currentUser.id}`}>
                    <img className="noti-icon" src={Noti} alt="" />
                </Link>
            </div>

            <div className="home-products">
                <h5 className="maintitles">{t('recommended')}</h5>
                <Slider {...sliderSettings}>
                    {slicedProducts
                        .map(post => (
                            <div>
                                <ProductCard
                                    image={post.image_url}
                                    title={post.product_name}
                                    desc={post.product_description}
                                    id={post.id}
                                    likes={post.likes}
                                />
                            </div>
                        ))}
                </Slider>
            </div>

            <div className="home-recipes">
                <h5 className="maintitles">{t('recipes')}</h5>
                <Slider {...sliderSettings}>
                    {slicedRecipes
                        .map(post => (
                            <div>
                                <RecipeCard
                                    image={post.image_url}
                                    title={post.title}
                                    desc={post.description}
                                    id={post.id}
                                />
                            </div>
                        ))}
                </Slider>
            </div>

        </div >
    );
}

// Exporting Home component
export default Home;

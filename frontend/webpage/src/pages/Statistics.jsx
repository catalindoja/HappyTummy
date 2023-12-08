import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const App = () => {

    // Current user 
    const { currentUser } = useContext(AuthContext);
    let userLikes = 0;
    let userComments = 0;

    // Supermarket
    const [marketuser, setMarketNameUser] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/markets/${currentUser.idsupermarket}`);
                const data = response.data;
                setMarketNameUser(data); // Actualiza el estado con el nombre del mercado
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [currentUser.idsupermarket]);


    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/products`);
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, []);

    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get(`/recipes`)
                setRecipes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRecipes();
    }, []);

    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments`)
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchComments();
    }, []);

    const [commentRecipes, setCommentRecipes] = useState([]);
    useEffect(() => {
        const fetchCommentRecipes = async () => {
            try {
                const res = await axios.get(`/commentRecipes`)
                setCommentRecipes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCommentRecipes();
    }, []);

    // useEffect to handle data when all are fetched
    useEffect(() => {
        const handleFetches = () => {
            // Check if all data is available
            if (recipes.length > 0 && products.length > 0 && comments.length > 0 && commentRecipes.length > 0) {
                // Do something with the data
                console.log("All data fetched:", recipes, products, comments, commentRecipes);
                // Call your custom logic or function here
                handleData();
            }
        };
        handleFetches();
    }, [recipes, products, comments, commentRecipes]);


    /*
        El problema es que, user tiene likes y comments, pero también tiene productos y recetas.
        Entonces claro una cosa es el numero de productos del usuario, el numero de recetas del usuario.
        Pero luego también tiene likes y comentarios. Los likes es simplemente sumar todos los likes de los productos, recetas y comentarios.
        Y los comentarios es sumar todos los comentarios de los comentarios y del los commentRecipe. Esto impluca otro fetch para commentRecipe.
    */


    const handleData = () => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].iduser === currentUser.id) {
                userLikes += products[i].likes;
                userComments += 1;
            }
        }
    
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].iduser === currentUser.id) {
                userLikes += recipes[i].likes;
                userComments += 1;
            }
        }

        for (let i = 0; i < comments.length; i++) {
            if (comments[i].iduser === currentUser.id) {
                userLikes += comments[i].likes;
                userComments += 1;
            }
        }

        for (let i = 0; i < commentRecipes.length; i++) {
            if (commentRecipes[i].iduser === currentUser.id) {
                userLikes += commentRecipes[i].likes;
                userComments += 1;
            }
        }
    
        console.log(userLikes)
        console.log(userComments)
    }

    const options1 = {
        chart: {
            stacked: false,
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 1000,
            },
        },
        xaxis: {
            categories: ["2017", "2018", "2019", "2020", "2022", "2023"],
            labels: {
                style: {
                    colors: ["#333"],
                    fontSize: "14px",
                },
            },
        },
        yaxis: {
            title: {
                text: "Counts",
                style: {
                    color: "#333",
                },
            },
        },
        colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
        fill: {
            opacity: 0.7,
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            fontSize: "16px",
            markers: {
                radius: 12,
                width: 30,
                height: 12,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%",
                endingShape: "rounded",
            },
        },
    };

    const series1 = [
        {
            name: "Likes",
            data: [340, 500, 250, 680, 450, 700],
        },
        {
            name: "Comments",
            data: [220, 120, 250, 650, 100, 450],
        },
        {
            name: "Products",
            data: [220, 420, 350, 550, 300, 460],
        },
        {
            name: "Recepies",
            data: [120, 20, 450, 350, 180, 260],
        },
    ];

    const series2 = [
        {
            name: "Likes",
            data: [50, 80, 30, 70, 45, 60],
        },
        {
            name: "Comments",
            data: [30, 20, 50, 65, 10, 45],
        },
        {
            name: "Products",
            data: [22, 42, 35, 55, 30, 46],
        },
        {
            name: "Recepies",
            data: [12, 32, 65, 75, 10, 12],
        },
    ];

    return (
        <div className="statistics-intro">
            <h1 className="supertitle">My statistics 📊</h1>
            <p>These are the statistics of your personal profile and and the supermarket you are affiliated to.</p>

            <h2>Personal profile</h2>
            <span>{currentUser.username}</span>
            <div>
                <Chart options={options1} series={series2} type="line" height={450} />
            </div>

            <h2>Supermarket</h2>
            <span>{marketuser.name}</span>
            <div>
                <Chart options={options1} series={series1} type="bar" height={450} />
            </div>
        </div>
    );
};

export default App;

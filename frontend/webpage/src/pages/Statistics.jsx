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
    let userProducts = 0;
    let userRecipes = 0;
    let supermarketLikes = 0;
    let supermarketComments = 0;
    let supermarketProducts = 0;
    let supermarketRecipes = 0;


    const [options1, setOptions1] = useState({});
    const [series1, setSeries1] = useState([]);
    const [series2, setSeries2] = useState([]);

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

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`/users`)
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    // useEffect to handle data when all are fetched
    useEffect(() => {
        const handleFetches = () => {
            // Check if all data is available
            if (recipes.length > 0 && products.length > 0 && comments.length > 0 && commentRecipes.length > 0 && users.length > 0) {
                // Do something with the data
                console.log("All data fetched:", recipes, products, comments, commentRecipes);
                // Call your custom logic or function here
                handleData();
            }
        };
        handleFetches();
    }, [recipes, products, comments, commentRecipes, users]);


    /*
        El problema es que, user tiene likes y comments, pero también tiene productos y recetas.
        Entonces claro una cosa es el numero de productos del usuario, el numero de recetas del usuario.
        Pero luego también tiene likes y comentarios. Los likes es simplemente sumar todos los likes de los productos, recetas y comentarios.
        Y los comentarios es sumar todos los comentarios de los comentarios y del los commentRecipe. Esto impluca otro fetch para commentRecipe.
    */


    const handleData = () => {
        // user side of the statistics
        for (let i = 0; i < products.length; i++) {
            if (products[i].iduser === currentUser.id) {
                userLikes += products[i].likes;
                userComments += 1;
                userProducts += 1;
            }
        }
    
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].iduser === currentUser.id) {
                userLikes += recipes[i].likes;
                userComments += 1;
                userRecipes += 1;
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

        // supermarket side of the statistics
        for(let i = 0; i < users.length; i++) {
            if(users[i].idsupermarket === currentUser.idsupermarket) {
                for(let j = 0; j < products.length; j++) {
                    if(products[j].iduser === users[i].id) {
                        supermarketLikes += products[j].likes;
                        supermarketComments += 1;
                        supermarketProducts += 1;
                    }
                }
                for(let j = 0; j < recipes.length; j++) {
                    if(recipes[j].iduser === users[i].id) {
                        supermarketLikes += recipes[j].likes;
                        supermarketComments += 1;
                        supermarketRecipes += 1;
                    }
                }
                for(let j = 0; j < comments.length; j++) {
                    if(comments[j].iduser === users[i].id) {
                        supermarketLikes += comments[j].likes;
                        supermarketComments += 1;
                    }
                }
                for(let j = 0; j < commentRecipes.length; j++) {
                    if(commentRecipes[j].iduser === users[i].id) {
                        supermarketLikes += commentRecipes[j].likes;
                        supermarketComments += 1;
                    }
                }
            }
        }
        setChartsData();
    }

    const setChartsData = async () => {
        const updatedOptions1 = {
            chart: {
                stacked: false,
                animations: {
                    enabled: true,
                    easing: "easeinout",
                    speed: 1000,
                },
            },
            xaxis: {
                categories: ["2023"],
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

        const updatedSeries1 = [
            {
                name: "Likes",
                data: [supermarketLikes],
            },
            {
                name: "Comments",
                data: [supermarketComments],
            },
            {
                name: "Products",
                data: [supermarketProducts],
            },
            {
                name: "Recepies",
                data: [supermarketRecipes],
            },
        ];

        const updatedSeries2 = [
            {
                name: "Likes",
                data: [userLikes],
            },
            {
                name: "Comments",
                data: [userComments],
            },
            {
                name: "Products",
                data: [userProducts],
            },
            {
                name: "Recepies",
                data: [userRecipes],
            },
        ];

        setOptions1(updatedOptions1);
        setSeries1(updatedSeries1);
        setSeries2(updatedSeries2);
    }

    return (
        <div className="statistics-intro">
            <h1 className="supertitle">My statistics 📊</h1>
            <p>These are the statistics of your personal profile and and the supermarket you are affiliated to.</p>

            <h2>Personal profile</h2>
            <span>{currentUser.username}</span>
            <div>
                <Chart options={options1} series={series2} type="bar" height={450} />
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

import React, { useState, useContext } from "react";
import Chart from "react-apexcharts";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useEffect } from "react";

const App = () => {

    // Current user 
    const { currentUser } = useContext(AuthContext);

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
            horizontalAlign: "right",
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
            name: "Views",
            data: [460, 340, 300, 890, 430, 600],
        },
        {
            name: "Researches",
            data: [250, 320, 180, 270, 400, 300],
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
            name: "Views",
            data: [60, 40, 30, 30, 43, 60],
        },
        {
            name: "Researches",
            data: [25, 32, 18, 27, 40, 30],
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
            <h1>My statistics 📊</h1>
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

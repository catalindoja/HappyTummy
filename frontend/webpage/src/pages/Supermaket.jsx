import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Supermarket.css";

const Supermarket = () => {
    const [supermarkets, setSupermarkets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/supermarket"); // Assuming this endpoint returns all supermarkets
                setSupermarkets(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const filteredSupermarkets = supermarkets.filter((supermarket) =>
        supermarket.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home">
            <div className="posts">
                <input
                    type="text"
                    placeholder="Search for the supermarket"
                    className="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h2>Supermarkets</h2>
                {filteredSupermarkets.length === 0 ? (
                    <p>Sorry, There are no matching supermarkets!</p>
                ) : (
                    filteredSupermarkets.map((supermarket) => (
                        <div className="cat" key={supermarket.id}>
                            <p>Supermarket Name : {supermarket.name}</p>
                            <p>Description: {supermarket.description}</p>
                            <p>Address: {supermarket.address}</p>
                            <p>City: {supermarket.city}</p>
                            <p>Zipcode: {supermarket.zipcode}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Supermarket;

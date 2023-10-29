import React, { useEffect, useState } from "react";
import axios from "axios";


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/categories"); // Assuming this endpoint returns all categories
                setCategories(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const filteredCategories = categories.filter((category) =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home">
            <div className="posts">
                
                <input
                    type="text"
                    placeholder="Search for the category"
                    className="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h2>Categories</h2>
                {filteredCategories.length === 0 ? (
                    <p>Sorry, There are no matching categories!</p>
                ) : (
                    filteredCategories.map((category) => (
                        <div className="cat" key={category.id}>
                            <div className="content">
                                <h3>Category Name : {category.category_name}</h3>
                                {/* You can add more details here if needed */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Categories;



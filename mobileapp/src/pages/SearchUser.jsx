import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { BACKEND_API_URL } from '../config/proxy.js';
import './Search.css';
import BackArrow from "../components/BackArrow";
import './SearchUser.css';

function SearchUser() {
    // Obtain users
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/users`);
                console.log(res.data);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    // Filter users
    const [SearchTermUser, setSearchTermUser] = useState("");

    return (
        <div className="searchusercontent">
            <BackArrow />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="..." crossorigin="anonymous"></link>

            <div className="userlist">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export default SearchUser;

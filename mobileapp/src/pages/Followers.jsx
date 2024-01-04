import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../components/UserCard.jsx";
import { BACKEND_API_URL } from '../config/proxy.js';
import './Search.css';
import BackArrow from "../components/BackArrow.jsx";
import './Followers.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

function Followers() {

    // Current user
    const location = useLocation();
    const currentUserId = location.pathname.split("/")[3];

    // Obtain followers
    let [followersList, setfollowers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/followers`);

                // Followers
                const followersList = res.data.filter(entry => entry.idFollowed == currentUserId);
                setfollowers(followersList);

            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    // Obtain users
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/users`);

                // Obtener los ids de los seguidores
                const followerIds = followersList.map(follower => follower.idFollower);

                // Filtrar los usuarios basándose en los ids de los seguidores
                const filteredUsers = res.data.filter(user => followerIds.includes(user.id));

                setUsers(filteredUsers);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [followersList]);

    // Filter users
    const [SearchTermUser, setSearchTermUser] = useState("");
    let filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(SearchTermUser.toLowerCase())
    );

    return (
        <div className="followcontent">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="..." crossorigin="anonymous"></link>

            <BackArrow />

            <div className="followtitle">
                Followers
            </div>

            <div className="boxes-follow">
                <fieldset>
                    <input
                        type="text"
                        className="search-follow"
                        value={SearchTermUser}
                        placeholder="Who are you looking for?"
                        onChange={(e) => setSearchTermUser(e.target.value)}
                    />
                </fieldset>
            </div>

            <div className="userlist">
                {filteredUsers.length === 0 && (
                    <p className="follow-error">No followers found 🤔</p>
                )}
                {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>

        </div>
    );
}

export default Followers;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_API_URL } from '../config/proxy.js';
import './Search.css';
import BackArrow from "../components/BackArrow.jsx";
import './Notifications.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotiCard from "../components/NotiCard.jsx";

function Notifications() {

    // Current user
    const location = useLocation();
    const currentUserId = location.pathname.split("/")[3];

    // Obtain my notifications
    const [mynotis, setMynotis] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_URL}/notifications`);

                // Filter my notifications
                const mynotis = res.data.filter(notis => notis.idReceiver == currentUserId);

                setMynotis(mynotis);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [currentUserId]);

    return (
        <div className="searchusercontent">
            <BackArrow />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="..." crossorigin="anonymous"></link>

            <div className="notititle">
                Notifications
            </div>

            <div className="noti-list">
                {mynotis.length === 0 && (
                    <p className="notis-error">No new notifications yet ✉</p>
                )}
                {mynotis.map((noti) => (
                    <NotiCard key={noti.id} noti={noti} />
                ))}
            </div>
        </div>
    );
}

export default Notifications;

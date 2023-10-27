import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";

const Profile = () => {
    const history = useNavigate();

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

    const handleDelete = async () => {
        try {
            await axios.delete('/api/user/profile');
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="personal-profile">
            <h1 className="supertitle">Profile 😉 </h1>
            <div>
                <h2 className="heading">Personal data <img className="editimg" src={Edit} alt="" /> <img className="deleteimg" src={Delete} alt="" /></h2>
                <div className="data">
                    <div className="item">
                        <span className="item-title">Username: </span>
                        <span className="item-value">{currentUser.username}</span>
                    </div>
                    <div className="item">
                        <span className="item-title">Email: </span>
                        <span className="item-value">{currentUser.email}</span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="heading">Affiliated supermarket</h2>
                <div className="data">
                    <div className="item">
                        <span className="item-title">Name: </span>
                        <span className="item-value">{marketuser.name}</span>
                    </div>
                    <div className="item">
                        <span className="item-title">Description: </span>
                        <span className="item-value">{marketuser.description}</span>
                    </div>
                    <div className="item">
                        <span className="item-title">City: </span>
                        <span className="item-value">{marketuser.city}</span>
                    </div>
                    <div className="item">
                        <span className="item-title">Address: </span>
                        <span className="item-value">{marketuser.address}</span>
                    </div>
                    <div className="item">
                        <span className="item-title">Zip code: </span>
                        <span className="item-value">{marketuser.zipcode}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;
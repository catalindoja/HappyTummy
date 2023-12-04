import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./EditPerfil.css";
import User from "../img/user.jpeg";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BACKEND_API_URL } from '../config/proxy.js';
import BackArrow from "../components/BackArrow";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Configration from "../components/Configration";

const EditPerfil = () => {

    // Log out
    const { currentUser, logout } = useContext(AuthContext);

    // Obtains the state from the location
    const state = useLocation().state;
    const navigate = useNavigate();

    const { t } = useTranslation();
    const { id } = useParams();
    const [iduser, setIdUser] = useState({
        iduser: ''
    });
    const [userData, setUserData] = useState({

        username: "",
        email: "",
        realname: "",
        realusurname: "",
        password: "",
        image: null, // Imagen predeterminada
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
        }));
    };

    const fetchUserDataFromServer = async (userId) => {
        console.log(userId)
        try {
            const response = await fetch(`${BACKEND_API_URL}/users/${userId}`);
            if (!response.ok) {
                throw new Error("Error al obtener datos del usuario");
            }
            const userData = await response.json();
            console.log(userData);
            setUserData(userData);
            iduser.iduser = userId;

        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        fetchUserDataFromServer(id);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = iduser.iduser;
        // console.log(id);
        let response1 = await axios.patch(`${BACKEND_API_URL}/users/${id}`, userData);
        // console.log(response1)
        navigate("/app/profile");
    };

    return (
        <div className="container my-5">
            <BackArrow /> 
            <div className="form1">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label htmlFor="username" className="my-1 editprofile-minititle">{t('username')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            autoComplete="off"
                            placeholder={t('placeholder_username')}
                            value={userData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className="my-1 editprofile-minititle" htmlFor="email">{t('label_email')}</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            autoComplete="off"
                            placeholder={t('placeholder_text_email')}
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className="my-1 editprofile-minititle" htmlFor="realname">{t('name')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="realname"
                            autoComplete="off"
                            placeholder={t('placeholder_name')}
                            value={userData.realname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="my-1 editprofile-minititle" htmlFor="realsurname">{t('surname')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="realsurname"
                            autoComplete="off"
                            placeholder={t('placeholder_surname')}
                            value={userData.realusurname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3 editprofile-minititle">
                        <label className="my-1" htmlFor="password">{t('password')}</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            autoComplete="off"
                            placeholder={t('placeholder_password')}
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onSubmit={handleSubmit} type="submit" className="btn btn-success editprofile-button">{t('send')}</button>
                </form>

                </div>

                <button onClick={logout} className="btn btn-success logout-button">Log out</button>

            </div>
    );
};

export default EditPerfil;

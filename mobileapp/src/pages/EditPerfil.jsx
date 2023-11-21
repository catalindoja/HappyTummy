import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./EditPerfil.css";
import User from "../img/user.jpeg";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BACKEND_API_URL } from '../config/proxy.js';

const EditPerfil = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [iduser, setIdUser] = useState({
        iduser: ''
    });
    const [userData, setUserData] = useState({

        username: "",
        email: "",
        realname: "",
        realusurname :"",
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        const id = iduser.iduser;
        console.log(id);
        let response1 = await axios.patch(`${BACKEND_API_URL}/users/${id}`, userData);
        //console.log(userData);
        console.log(response1)
        // Lógica para enviar los datos actualizados al servidor
        //console.log("Datos enviados:", userData);
    };

    return (
        <div className="container my-5">
            <div className="box_arrow">
                <button className="btn1 bg-dark">
                    <span className="go_back px-2">{t('go_back')}</span>
                    <span className="arrow"><FontAwesomeIcon icon={faArrowLeft} /></span>
                </button>
            </div>
            <div>
                <img className="img_user" src={User} alt="User" />
            </div>
            <div className="form1">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label htmlFor="username" className="my-1">{t('username')}</label>
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
                        <label className="my-1"  htmlFor="email">{t('label_email')}</label>
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
                        <label className="my-1" htmlFor="realname">{t('name')}</label>
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
                        <label className="my-1" htmlFor="realsurname">{t('surname')}</label>
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
                    <div className="form-group mb-3">
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
                    <button onSubmit={handleSubmit} type="submit" className="btn btn-success">{t('send')}</button>
                </form>
            </div>
        </div>
    );
};

export default EditPerfil;

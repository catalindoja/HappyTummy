import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BACKEND_API_URL } from '../config/proxy.js';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import "./EditPerfil.css";
import Configration from "../components/Configration";
import Modal from 'react-modal';
import DOMPurify from "dompurify";
import arrowImage from "../img/arrow.png";
import User from "../img/user.jpeg";
import BackArrow from "../components/BackArrow";

// EditPerfil component
const EditPerfil = () => {

    // Log out
    const { currentUser, logout } = useContext(AuthContext);

    // Obtains the state from the location
    const state = useLocation().state;
    const navigate = useNavigate();

    // Translation
    const { t } = useTranslation();

    // Obtains the id from the url
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
        image: null,
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
        }));
    };

    // Fetch user data from server
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

    // Handle submit changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = iduser.iduser;
        let response1 = await axios.patch(`${BACKEND_API_URL}/users/${id}`, userData);
        navigate("/app/profile");
    };

    // Modal pop-up
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
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
                            value={"password"}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onSubmit={handleSubmit} type="submit" className="btn btn-success editprofile-button">{t('save')}</button>
                </form>
            </div>
            <button onClick={openModal} className="btn btn-success logout-button">Log out</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <div>
                    <span className="premium-description">
                        <p className="premium-text"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize("Are you sure you want to log out?")
                            }}
                        ></p>
                    </span>
                    <div className="popup-confirm-buttons">
                        <button className="cancel-button" onClick={closeModal}>
                            Cancel
                        </button>
                        <button className="confirm-button" onClick={logout}>
                            Confirm
                        </button>
                    </div>
                    <img
                        src={arrowImage}
                        alt="Close"
                        className="close-icon"
                        onClick={closeModal}
                    />
                </div>
            </Modal>

            {/* <button onClick={logout} className="btn btn-success logout-button">Log out</button> */}

        </div>
    );
};

// Exporting EditPerfil component
export default EditPerfil;

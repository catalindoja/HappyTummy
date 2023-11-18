import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./EditPerfil.css";
import User from "../img/user.jpeg";
import { useParams } from 'react-router-dom';

const EditPerfil = () => {
    const { id } = useParams();
    const [iduser, setIdUser] = useState({
        iduser: ''
    });
    const [userData, setUserData] = useState({

        username: "",
        email: "",
        realname: "",
        realusername :"",
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
        try {
            const response = await fetch(`/users/${userId}`);
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
        let response1 = await axios.patch(`/users/${id}`, userData);
        //console.log(userData);
        console.log(response1)
        // Lógica para enviar los datos actualizados al servidor
        //console.log("Datos enviados:", userData);
    };

    return (
        <div className="container my-5">
            <div className="box_arrow">
                <button className="btn1 bg-dark">
                    <span className="go_back">Go Back</span>
                    <span className="arrow"><FontAwesomeIcon icon={faArrowLeft} /></span>
                </button>
            </div>
            <div>
                <img className="img_user" src={User} alt="User" />
            </div>
            <div className="form1">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter Your Username"
                            value={userData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Your Email Address"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="realname">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="realname"
                            placeholder="Enter Your Name"
                            value={userData.realname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="realsurname">Surname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="realsurname"
                            placeholder="Enter Your surName"
                            value={userData.realsurname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Your Password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onSubmit={handleSubmit} type="submit" className="btn btn-success">Send</button>
                </form>
            </div>
        </div>
    );
};

export default EditPerfil;

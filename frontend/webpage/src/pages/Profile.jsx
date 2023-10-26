import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const history = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete('/api/user/profile');
            history.push('/login');
        } catch (error) {
            console.log(error); 
        }
    };

    return (
        <div>
            <h1>Profile 😉</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>{currentUser.username}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{currentUser.email}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <img className="editimg" src={Edit} alt="" />
                <img className="editimg" src={Delete} alt="" />
            </div>
        </div>
    );
};

export default Profile;

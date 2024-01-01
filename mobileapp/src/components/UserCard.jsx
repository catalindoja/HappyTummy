import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.css";
import Profilepic from "../img/profile.png";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <Link to={`/app/user/${user.id}`} className="user-link">
        <img src={Profilepic} alt={`Profile of ${user.username}`} className="user-avatar" />
        <p className="user-username">{user.username}</p>
      </Link>
    </div>
  );
};

export default UserCard;

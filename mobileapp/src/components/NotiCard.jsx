import React from "react";
import { Link } from "react-router-dom";
import "./NotiCard.css";
import Profilepic from "../img/profile.png";

const NotiCard = ({ noti }) => {
  return (
    <div className="noti-card">
        <h3 className="noti-title">New notification!</h3>
        <p className="noti-content">{noti.content}</p>
    </div>
  );
};

export default NotiCard;

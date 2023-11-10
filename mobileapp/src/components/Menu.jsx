import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from "../img/home.jpg"
import PostIcon from "../img/post.jpg"
import SearchIcon from "../img/search.jpg"
import ProfileIcon from "../img/profile.jpg"

//a menu like the one in instagram with 4 buttons
//the buttons will be home, post, search and profile
//the buttons will be images with links to the respective pages

const Menu = () => {
    return (
        <div className="container">
            <Link to="/">
                <img src="../img/logo2.png" alt="" className="logo" />
            </Link>
            <div className="container-fluid" style={{backgroundColor: "#C9FFFF"}}>
                <Link to="/">
                <img className="p-2" src={HomeIcon} alt="d4" />
                </Link>
                <Link to="/products/new">
                <img className="p-2" src={PostIcon} alt="d3" />
                </Link>
                <Link to="/search">
                <img className="p-2" src={SearchIcon} alt="dr2" />
                </Link>
                <Link to="/profile">
                <img className="p-2" src={ProfileIcon} alt="dr1" />
                </Link>
            </div>
        </div>
    );
}

export default Menu;
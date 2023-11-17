import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import HomeIcon from "../img/home.png"
import PostIcon from "../img/post.png"
import SearchIcon from "../img/search.png"
import ProfileIcon from "../img/profilemenu.png"

//a menu like the one in instagram with 4 buttons
//the buttons will be home, post, search and profile
//the buttons will be images with links to the respective pages

const Menu = () => {
    return (
        <div className="w-100 sticky-bottom">
          <Link to="/">
            <img src="../img/logo2.png" alt="" className="logo" />
          </Link>
          <div
            className="d-flex justify-content-around w-100"
            style={{
              backgroundColor: '#C9FFFF',
              border: '1px solid #acf9f9', // Borde azul más fuerte
            }}
          >
            <Link to="/home">
              <img className="p-2" src={HomeIcon} alt="d4" style={{ width: '65px', height: '65px' }}/>
            </Link>
            <Link to="/postproduct">
              <img className="p-2" src={PostIcon} alt="d3" style={{ width: '63px', height: '63px' }}/>
            </Link>
            <Link to="/search">
              <img className="p-2" src={SearchIcon} alt="dr2" style={{ width: '65px', height: '65px' }}/>
            </Link>
            <Link to="/profile">
              <img className="p-2" src={ProfileIcon} alt="dr1" style={{ width: '65px', height: '65px' }}/>
            </Link>
          </div>
        </div>
      );
}

export default Menu;
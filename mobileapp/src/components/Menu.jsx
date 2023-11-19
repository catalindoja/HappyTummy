import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import HomeIcon from "../img/home.png";
import PostIcon from "../img/post.png";
import SearchIcon from "../img/search.png";
import ProfileIcon from "../img/profilemenu.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';


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
          backgroundColor: "#4444a0"
        }}
        /*style={{
          backgroundColor: '#C9FFFF',
          border: '1px solid #acf9f9',
        }}*/
      >
        <Link to="/app/home">
          <FontAwesomeIcon icon={faHome} className="p-2" style={{ color: 'white' }} />
        </Link>
        <Link to="/app/postproduct">
          <FontAwesomeIcon icon={faPlus} className="p-2" style={{ color: 'white' }} />
        </Link>
        <Link to="/app/search">
          <FontAwesomeIcon icon={faSearch} className="p-2" style={{ color: 'white' }} />
        </Link>
        <Link to="/app/profile">
          <FontAwesomeIcon icon={faUser} className="p-2" style={{ color: 'white' }} />
        </Link>
      </div>
    </div>
  );
}

export default Menu;

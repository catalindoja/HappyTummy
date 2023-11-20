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
import "./Menu.css";


//a menu like the one in instagram with 4 buttons
//the buttons will be home, post, search and profile
//the buttons will be images with links to the respective pages

const Menu = () => {
  return (
    
    <div className="w-100 sticky-bottom">
      <div
        className="d-flex justify-content-around w-100 bg-dark"
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

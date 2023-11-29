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

const Menu = () => {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  return (

    <div className="w-100 sticky-bottom">
      {showPopup && (
        <div className="popup d-flex justify-content-center me-2 popupbuttons">
          <Link to="/app/postproduct"><button>Post Product</button></Link>
          <Link to="/app/postrecipe"><button>Post Recipe</button></Link>
        </div>
      )}

      <div
        className="d-flex justify-content-around w-100"
        style={{
          backgroundColor: '#C9FFFF',
          border: '1px solid #acf9f9', 
        }}
      >
        <Link to="/app/home">
          <FontAwesomeIcon icon={faHome} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
        </Link>
        <div onClick={togglePopup}>
          <FontAwesomeIcon icon={faPlus} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
        </div>
        <Link to="/app/search">
          <FontAwesomeIcon icon={faSearch} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
        </Link>
        <Link to="/app/profile">
          <FontAwesomeIcon icon={faUser} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
        </Link>
      </div>
    </div>
  );
}

export default Menu;

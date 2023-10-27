import React, { useContext, useState } from "react";
import { useRef } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  // V2 popup
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMenuVisible(false);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          {/* <Link to="/"> */}
          <img src={Logo} alt="" />
          {/* </Link> */}
        </div>
        <div className="links">
          <Link className="link" to="/products">
            <h6>PRODUCTS</h6>
          </Link>
          <Link className="link" to="/recipes">
            <h6>RECIPES</h6>
          </Link>
          <Link className="link" to="/">
            <h6>SUPERMARKETS</h6>
          </Link>
          <Link className="link" to="/allergies">
            <h6>ALLERGENS INFO</h6>
          </Link>
          <Link className="link" to="/statistics">
            <h6>MY STATISTICS</h6>
          </Link>
          <Link className="linkprofile" to="/profile">
            {currentUser?.username}
          </Link>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <span>Logout</span>)}

          {/*<Link className="link" to="/login">
              Login
            </Link>  */}

          {/* <span className="write">
            <Link className="link" to="/postproduct">
              Post
            </Link>
          </span> */}

          <div>
            {/* Botón para abrir el menú emergente */}
            <span className="write" onClick={() => setMenuVisible(true)}>
              Post
            </span>

            {/* Menú emergente */}
            {isMenuVisible && (
              <div className="menu">
                <h3 className="menu-title">What do you want to post?😏</h3>
                <div className="menu-buttons">
                  <div className="menu-item" onClick={() => handleOptionClick("product")}>
                    <Link to="/postproduct">New product</Link>
                  </div>
                  <div className="menu-item" onClick={() => handleOptionClick("recipe")}>
                    <Link to="/postrecipe">New recipe</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div >
  );
};

export default Navbar;

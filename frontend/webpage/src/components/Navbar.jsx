import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import Dot from "../img/teal.png";

// Create the Navbar component
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  // Render the Navbar component
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
        <Link className="link" to="/">
          <img src={Logo} alt="" />
        </Link>
        </div>
        <div className="links">
          <Link className="link" to="/products">
            <h6>PRODUCTS</h6>
            <img className="justadot" src={Dot} alt="" />
          </Link>
          <Link className="link" to="/recipes">
            <h6>RECIPES</h6>
            <img className="justadot" src={Dot} alt="" />
          </Link>
          <Link className="link" to="/markets">
            <h6>MARKETS INFO</h6>
            <img className="justadot" src={Dot} alt="" />
          </Link>
          <Link className="link" to="/allergies">
            <h6>ALLERGENS INFO</h6>
            <img className="justadot" src={Dot} alt="" />
          </Link>
          <Link className="link" to="/statistics">
            <h6>MY STATISTICS</h6>
            <img className="justadot" src={Dot} alt="" />
          </Link>
          <Link className="linkprofile" to="/profile">
            {currentUser?.username}
          </Link>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <span>Logout</span>)}
        </div>
      </div>
    </div >
  );
};

// Export the Navbar component
export default Navbar;

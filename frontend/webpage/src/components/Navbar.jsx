import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import Dot from "../img/teal.png";

// Create the Navbar component
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  // Menu visible
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMenuVisible(false);
  };

  // Render the Navbar component
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" />
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

          <div>
            <span className="write" onClick={() => setMenuVisible(true)}>
              Post
            </span>

            {isMenuVisible && (
              <div className="menu">
                <span className="close-icon" onClick={() => setMenuVisible(false)}>
                  &#10006;
                </span>
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

// Export the Navbar component
export default Navbar;

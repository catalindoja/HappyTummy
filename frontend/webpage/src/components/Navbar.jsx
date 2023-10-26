import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

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
          <Link className="link" to="/recepies">
            <h6>RECEPIES</h6>
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
          {/* <Link className="link" to="/">
            <h6>MY PAYMENTS</h6>
          </Link> */}
          {/* <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link> */}
          <Link to="/profile" style={{ fontWeight: "bold" }}>
            {currentUser?.username}
          </Link>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ): (
            <span>Logout</span>)}

             {/*<Link className="link" to="/login">
              Login
            </Link>  */} 

          <span className="write">
            <Link className="link" to="/postproduct">
              Post
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

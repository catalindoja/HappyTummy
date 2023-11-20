import React from "react";
import Logo from "../img/logo2.png";
import './Init.css';
import backgroundImage from "../img/clearbackground.png";
import { Link } from 'react-router-dom';

function Init() {




  return (
    <div className="login_content" style={{ backgroundImage: `url(${backgroundImage})` }}>

      <h1 className="display-2">Happy Tummy</h1>
      <p>Your partner in allergy-free shopping ♥ </p>

      <div className="login_logo">
        <img src={Logo} alt="" />
      </div>

      <div className="login_buttons">
        <Link to={"/login"}>
          <button type="button" className="btn btn-primary btn-sm">LOG IN</button>
        </Link>
        <Link to={"/register"}>
          <button type="button" className="btn btn-secondary btn-sm">REGISTER</button>
        </Link>
        <Link to={"/app/scanner"}>
        <button type="button" className="btn btn-secondary btn-sm">SCANNER</button>
        </Link>
      </div>

    </div>
  );
}

export default Init;



import React from "react";
import Logo from "../img/logo2.png";
import './Init.css';
import backgroundImage from "../img/clearbackground.png";

function Init() {

  return (
    <div class="content" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>

      <h1 class="display-3">Happy Tummy</h1>
      <p>Welcome to the mafia :D</p>

      <div className="logo">
          <img src={Logo} alt="" />
      </div>

      <div class="buttons">
        <button type="button" class="btn btn-primary btn-sm">LOG IN</button>
        <button type="button" class="btn btn-secondary btn-sm">REGISTER</button>
      </div>

    </div>
  );
}

export default Init;



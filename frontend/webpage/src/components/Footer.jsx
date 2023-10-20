import React from "react";
import Logo2 from "../img/logo2.png";
import instagram from "../img/instagram.png"
import twitter from "../img/twitter.png"
import facebook from "../img/facebook.png"

const Footer = () => {
  return (
    <footer>
      <img src={Logo2} alt="" className="logo" />
      <div className="social-icons">
        <img src={instagram} alt="" />
        <img src={twitter} alt="" />
        <img src={facebook} alt="" />
      </div>
    </footer>
  );
};

export default Footer;

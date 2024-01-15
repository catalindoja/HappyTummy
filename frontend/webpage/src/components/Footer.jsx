import React from "react";
import Logo2 from "../img/logo2.png";
import instagram from "../img/instagram.png"
import twitter from "../img/twitter.png"
import facebook from "../img/facebook.png"

// Create the Footer component
const Footer = () => {
  return (
    <footer>
      <img src={Logo2} alt="" className="logo" />
      <div className="social-icons">
        <a className="social-icons-single" href="https://www.instagram.com/">
          <img src={instagram} alt="" />
        </a>
        <a className="social-icons-single" href="https://twitter.com/">
          <img src={twitter} alt="" />
        </a>
        <a className="social-icons-single" href="https://www.facebook.com/">
          <img src={facebook} alt="" />
        </a>
      </div>
    </footer>
  );
};

// Export the Footer component
export default Footer;

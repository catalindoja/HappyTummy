import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Init.css';
import backgroundImage from "../img/clearbackground.png";
import Logo from "../img/logo2.png";
import Configration from "../components/Configration";
import BackArrow from "../components/BackArrow";

// Init component
function Init() {
  const { t } = useTranslation();
  return (
    <div className="init_content" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Configration />

      <h1 className="display-2 init-title">Happy Tummy</h1>
      <p className="welcome-text">{t('paragraph_init1')}</p>

      <div className="init_logo">
        <img className="img11" src={Logo} alt="" />
      </div>

      <div className="init_buttons">
        <Link to={"/login"}>
          <button type="button" className="btn btn-primary btn-sm button-login">{t("login")}</button>
        </Link>
        <Link to={"/register"}>
          <button type="button" className="btn btn-primary btn-sm button-reg">{t("register")}</button>
        </Link>
      </div>

    </div>
  );
}

// Exporting Init component
export default Init;

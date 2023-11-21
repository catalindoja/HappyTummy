import React from "react";
import Logo from "../img/logo2.png";
import './Init.css';
import backgroundImage from "../img/clearbackground.png";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Configration from "../components/Configration";

function Init() {
  const { t } = useTranslation();
  return (
    <div className="login_content" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Configration />
      <h1 className="display-2">Happy Tummy</h1>
      <p>{t('paragraph_init1')} <span className="text-danger" style={{ fontSize: '30px' }}>♥</span></p>

      
      <div className="login_logo">
        <img className="img11" src={Logo} alt="" />
      </div>

      <div className="login_buttons">
        <Link to={"/login"}>
          <button type="button" className="btn btn-primary btn-sm">{t("login")}</button>
        </Link>
        <Link to={"/register"}>
          <button type="button" className="btn btn-success btn-sm">{t("register")}</button>
        </Link>
      </div>
    </div>
  );
}

export default Init;

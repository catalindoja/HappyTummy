import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BACKEND_API_URL } from '../config/proxy.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";
import Configration from "../components/Configration";
import { useTranslation } from 'react-i18next';
import backgroundImage from "../img/clearbackground.png";
import BackArrow from "../components/BackArrow";

// Login component
const Login = () => {

  // Log in
  const { login } = useContext(AuthContext);

  // Translation
  const { t } = useTranslation();

  // Treats the login
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // Error message
  const [err, setError] = useState(null);

  // Navigation
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.username.trim() === "") {
      setError("The 'username' field cannot be empty");
      return;
    }

    if (inputs.password.trim() === "") {
      setError("The 'password' field cannot be empty");
      return;
    }

    try {
      await login(inputs)
      navigate("/app/home");
    } catch (err) {
      setError(err.response.data);
    }
  };

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <BackArrow />
      <form>
        <h2 className="login-title">{t('login')}</h2>
        <input
          className="login-username"
          required
          type="text"
          placeholder={t('username')}
          name="username"
          onChange={handleChange}
        />
        <div className="password-container">
          <input
            className="login-password"
            required
            type={showPassword ? 'text' : 'password'}
            placeholder={t('password')}
            name="password"
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={togglePasswordVisibility}
          />
        </div>
        <button onClick={handleSubmit} className="login-but">{t('login')}</button>
        {err && <p className="login-err">{err}</p>}
        <div className="infotex">
          {t('account')} <Link to="/register"><span className="text-center text-primary">{t('register')}</span></Link>
        </div>
      </form>
    </div>
  );
};

// Exporting Login component
export default Login;
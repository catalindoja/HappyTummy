import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BACKEND_API_URL } from '../config/proxy.js';
import backgroundImage from "../img/clearbackground.png";
import "./Login.css";
import Configration from "../components/Configration";
import { useTranslation } from 'react-i18next';
import BackArrow from "../components/BackArrow";

const Login = () => {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        <input
          className="login-password"
          required
          type="password"
          placeholder={t('password')}
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className="login-but">{t('login')}</button>
        {err && <p className="login-err">{err}</p>}
        <div className="infotex">
          {t('account')} <Link to="/register"><span className="text-center text-primary">{t('register')}</span></Link>
        </div>
      </form>
    </div>
  );
};

// Export the Login component so that it can be used in other files.
export default Login;
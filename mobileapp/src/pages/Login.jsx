import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BACKEND_API_URL } from '../config/proxy.js';
import backgroundImage from "../img/clearbackground.png";
import "./Login.css";
import Configration from "../components/Configration";
import { useTranslation } from 'react-i18next';

// Create the Login component
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
      <Configration />
      <form>
        <h2 className="text-danger my-3 text-center">{t('login')}</h2>
        <input
          required
          type="text"
          placeholder={t('username')}
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder={t('password')}
          name="password"
          onChange={handleChange}
        />
        <button style={{ fontSize: '16px' }} onClick={handleSubmit} className="my-3 bg-success">{t('login')}</button>
        {err && <p>{err}</p>}
        <div className="infotex">
          {t('account')} <Link to="/register"><span className="text-center text-primary">{t('register')}</span></Link>
        </div>
      </form>
    </div>
  );
};

// Export the Login component so that it can be used in other files.
export default Login;
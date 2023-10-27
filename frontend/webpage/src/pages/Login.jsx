// import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import backgroundImage from "../img/background.png";

const Login = () => {
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
      navigate("/products");
    } catch (err) {
      // console.log(err.response.data);
      setError(err.response.data);
    }
  };
  return (
    <div className="auth" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form>
      <h1>Login</h1>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button style={{ fontSize: '16px' }} onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span className="infotext">
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

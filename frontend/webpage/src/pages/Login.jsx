import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import backgroundImage from "../img/background.png";

// Create the Login component
const Login = () => {

  // Set up the state variables
  // - inputs: an object that represents the input fields in the form
  // - err: a string that represents the error message if the user does not fill in the input fields
  //        (default value is null)
  // - navigate: a function that redirects the user to the Products page when the user clicks the 'Login' button
  // - login: a function that logs in the user when the user clicks the 'Login' button
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Set up the functions that handle the input fields and the form submission
  // - handleChange: a function that updates the state variable 'inputs' when the user types in the input fields
  // - handleSubmit: a function that logs in the user when the user clicks the 'Login' button
  //                (if the user does not fill in the input fields, the function will set the error message)
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
      setError(err.response.data);
    }
  };

  // Return the JSX elements
  return (
    <div className="auth" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form>
        <h1>Login</h1>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
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

// Export the Login component so that it can be used in other files.
export default Login;

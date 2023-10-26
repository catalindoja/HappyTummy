import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Register = () => {

  // Para los supermercados!!
  const [markets, setMarkets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/markets`);
        // console.log(res.data)
        setMarkets(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  
  const [inputs, setInputs] = useState({
    idsupermarket: "",
    username: "",
    email: "",
    password: "",
    role: 3,
    premium: 0
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value)
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isGmail = (email) => {
    const gmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return gmailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.username.trim() === "") {
      setError("The 'username' field cannot be empty");
      return;
    }

    if (inputs.email.trim() === "") {
      setError("The 'email' field cannot be empty");
      return;
    }

    if (inputs.idsupermarket.trim() === "") {
      setError("Select a supermarket");
      return;
    }

    if (inputs.password.trim() === "") {
      setError("The 'password' field cannot be empty");
      return;
    }

    if (!isGmail(inputs.email)) {
      setError("The email address is not in a valid format");
      return;
    }

    try {
      // http://localhost:4000/users  auth/register
      await axios.post("/register", inputs); // DANGER!!!
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        {/* <input
          required
          type="supermarket"
          placeholder="Supermarket"
          name="supermarket"
          onChange={handleChange}
        /> */}

        {/*NEW*/}
        <div>
          <fieldset>
            <legend>Supermarket</legend>
            {markets.map((market) => (
              <div key={market.id}>
                <input type="radio" id={market.name} name="idsupermarket" value={market.id} onChange={handleChange}/>
                <label for={market.name}>{market.name}</label>
              </div>
            ))}
          </fieldset>
        </div>

        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

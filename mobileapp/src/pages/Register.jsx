import React, { useState } from 'react';
import backgroundImage from "../img/clearbackground.png";
import './Register.css';
import axios from "axios";
import $ from "jquery";

const Register = () => {
  let id = 0;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 3,
    premium: 0,
    age: 0,
    gender: '',
    realname: '',
    realsurname: '',
    country: ''
    // Add other form fields for different steps
  });
  
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });

  const handlePasswords = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!validateEmail(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }else{
        const json = {
          email: formData.email
        }
        console.log(json)
        try{
          let response = await axios.post("/userexists", json);
          console.log(response)
          setStep(step + 1);
        } catch (err){
          $("#errorMail").toggleClass("invisible", "visible");
        }
      }
    } else if (step === 2) {
      // Validation for step 2, if needed
      if (formData.username.trim() === "") {
        //$("#username").attr("placeholder", "Please introduce a user!")
        alert("Please introduce an username!");
      }

      if (formData.realname.trim() === "") {
        alert("Please introduce a name!");
      }

      if (formData.realsurname.trim() === "") {
        alert("Please introduce a surname!");
      }

      if (formData.age.trim() === "") {
        alert("Please introduce an age!");
      }

      if (passwords.password.trim() === "") {
        alert("Please introduce a password!");
      }

      if (passwords.confirmPassword.trim() === "") {
        alert("Please confirm your password!");
      }

      if (passwords.password !== passwords.confirmPassword) {
        alert("Passwords do not match!");
      }else{
        formData.password = passwords.password
        console.log(formData.password)
        
        try{
          let response = await axios.post("/register", formData);
          console.log(response)
          setStep(step + 1);
        } catch (err){
          $("#errorMail").toggleClass("invisible", "visible");
        }
      }

    }

    
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const print = () => {
    console.log(formData.email)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h1>Step 1: Email</h1>
            <form onSubmit={handleNextStep}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="form-control"
                  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                  <label id="errorMail" htmlFor="ErrorMail" className='invisible text-danger'>This user already exists in our database! Register with another email.</label>
                </div>
              {error && <p className="error-msg">{error}</p>}
              <button onClick={print} type="submit" className="btn btn-primary">Next</button>
            </form>
          </div>
        );
      case 2:
        const countries = [
          "Select a country",
          "Spain",
          "France",
          "Italy",
          "Germany"
          // Add your list of countries here
        ];

        return (
          <div>
          <h1>Step 2: User Information</h1>
          <form onSubmit={handleNextStep}>
            <div className="form-group">
              <label htmlFor="realname">Name</label>
              <input
                name="realname"
                type="text"
                value={formData.realname}
                onChange={handleChange}
                className="form-control"
                id="realname"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="realsurname">Surname</label>
              <input
                name="realsurname"
                type="text"
                value={formData.realsurname}
                onChange={handleChange}
                className="form-control"
                id="realsurname"
                placeholder="Enter your surname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                id="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                value={passwords.password}
                onChange={handlePasswords}
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={handlePasswords}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
                id="age"
                placeholder="Enter your age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-control"
                id="gender">
                <option>select your geneder</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                id="country"
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {/* Add other form fields for step 2 */}
            <button type="submit" className="btn btn-primary">Next</button>
          </form>
        </div>
        );
      case 3:
        return (
          <div>
            <h1>Step 3: Checkboxes</h1>
            {/* Step 3 form fields */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="login-form" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {renderStep()}
    </div>
  );
};

export default Register;
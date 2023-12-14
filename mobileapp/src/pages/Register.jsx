import React, { useState, useEffect } from 'react';
import backgroundImage from "../img/clearbackground.png";
import './Register.css';
import axios from "axios";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { countries } from 'countries-list';
import { useTranslation } from 'react-i18next';
import { BACKEND_API_URL } from '../config/proxy.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Configration from "../components/Configration";
import i18n from "../components/i18n";
import BackArrow from "../components/BackArrow";
import Help from '../img/helpicon.png';

// Register component
const Register = () => {
  <Configration />

  // Translation
  const { t } = useTranslation();

  // Navigation
  const navigate = useNavigate();

  // States for the form data
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 3,
    premium: 0,
    age: '',
    gender: '',
    realname: '',
    realsurname: '',
    country: ''
  });

  // Set password and confirm password
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });

  // User id
  const [iduser, setIdUser] = useState({
    iduser: ''
  });

  // Market data
  const [markets, setMarkets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_API_URL}/markets`);
        setMarkets(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Allergy data
  const [allergies, setAllergies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_API_URL}/allergies`);
        setAllergies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Brand data
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_API_URL}/brands`);
        setBrands(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Selected markets, allergies and brands
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Handle passwords
  const handlePasswords = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState(null);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxes = (e) => {
    const { name, value, checked, type } = e.target;

    switch (name) {
      case 'market':
        handleCheckboxChange(value, checked, selectedMarkets, setSelectedMarkets);
        break;
      case 'allergy':
        handleCheckboxChange(value, checked, selectedAllergies, setSelectedAllergies);
        break;
      case 'brand':
        handleCheckboxChange(value, checked, selectedBrands, setSelectedBrands);
        break;
      default:
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;
    }
  };

  const handleCheckboxChange = (value, checked, selectedState, setSelectedState) => {
    if (checked) {
      setSelectedState((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedState((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    }
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!validateEmail(formData.email)) {
        setError(t('valid_email'));
        return;
      } else {
        const json = {
          email: formData.email
        };
        console.log(json);
        try {
          let response = await axios.post(`${BACKEND_API_URL}/userexists`, json);
          console.log(response);
          setStep(step + 1);
        } catch (err) {
          $("#errorMail").toggleClass("invisible", "visible");
        }
      }
    } else if (step === 2) {
      if (formData.username.trim() === "") {
        setError("Please introduce an username");
        return;
      }

      if (formData.realname.trim() === "") {
        setError("Please introduce a name");
        return;
      }

      if (formData.realsurname.trim() === "") {
        setError("Please introduce a surname");
        return;
      }

      if (passwords.password.trim() === "") {
        setError("Please introduce a password");
        return;
      }

      if (passwords.confirmPassword.trim() === "") {
        setError("Please confirm your password");
        return;
      }

      if (formData.age.trim() === "") {
        formData.age = 0;
      }

      if (passwords.password !== passwords.confirmPassword) {
        setError("Passwords do not match");
        return;
      } else {
        formData.password = passwords.password;
        console.log(formData.password);

        try {
          let response = await axios.post(`${BACKEND_API_URL}/register`, formData);
          console.log(response.data.id);
          iduser.iduser = response.data.id;
          console.log("user id is: " + iduser);
          setStep(step + 1);
        } catch (err) {
          $("#errorMail").toggleClass("invisible", "visible");
        }
      }
    } else if (step === 3) {
      const idUser = iduser;
      try {
        for (const idmarket of selectedMarkets) {
          const favoriteMarketData = {
            iduser: iduser.iduser,
            idmarket,
          };
          console.log(favoriteMarketData);
          await axios.post(`${BACKEND_API_URL}/favmarkets`, favoriteMarketData);
        }

        for (const idallergy of selectedAllergies) {
          const allergyData = {
            iduser: iduser.iduser,
            idallergy,
          };
          await axios.post(`${BACKEND_API_URL}/userallergies`, allergyData);
        }

        for (const idbrand of selectedBrands) {
          const brandData = {
            iduser: iduser.iduser,
            idbrand,
          };
          await axios.post(`${BACKEND_API_URL}/favbrands`, brandData);
        }

        navigate("/login");
      } catch (err) {
        console.log(error);
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const print = () => {
    //console.log(formData.email);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <BackArrow />
            <form onSubmit={handleNextStep}>
              <div className="form-group my-3 email-form">
                <label className='email-title' htmlFor="exampleInputEmail1">{t("label_email")}</label>
                <br />
                <input name="email" type="email" value={formData.email} onChange={handleChange}
                  className="form-control my-2 form-email" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder={t("placeholder_text_email")} />
              </div>

              <button
                className="next-but"
                onClick={print}
                type="submit"
              >
                {t("next")}
              </button>

              <div className="infotex">
                {"Do you have an account?"} <Link to="/login"><span className="text-center text-primary">{"Login"}</span></Link>
              </div>

              {error && <p className="error-msg">{error}</p>}
              <label id="errorMail" htmlFor="ErrorMail" className='invisible text-danger'>{t('email_existed')}</label>

            </form>
          </div>
        );
      case 2:
        const countryOptions = [t('select_country'), ...Object.values(countries).map(country => country.name)];
        return (
          <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <BackArrow />
            <form onSubmit={handleNextStep}>
              <h1 className='step2-title'>{t('step2')}</h1>
              <div className="form-group step2-form">
                <label htmlFor="username">{t('username')}</label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control my-1"
                  id="username"
                  placeholder={t('placeholder_username')}
                />
              </div>
              <div className="form-group step2-form">
                <label htmlFor="realname">{t('name')}</label>
                <input
                  name="realname"
                  type="text"
                  value={formData.realname}
                  onChange={handleChange}
                  className="form-control my-1"
                  id="realname"
                  placeholder={t('placeholder_name')}
                />
              </div>
              <div className="form-group step2-form">
                <label htmlFor="realsurname">{t('surname')}</label>
                <input
                  name="realsurname"
                  type="text"
                  value={formData.realsurname}
                  onChange={handleChange}
                  className="form-control my-1"
                  id="realsurname"
                  placeholder={t('placeholder_surname')}
                />
              </div>
              <div className="form-group step2-form">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.password}
                    onChange={handlePasswords}
                    className="form-control my-1"
                    id="password"
                    placeholder="Enter your password"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <div className="form-group step2-form">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-container">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwords.confirmPassword}
                    onChange={handlePasswords}
                    className="form-control my-1"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              </div>
              <label style={{ fontSize: '17.5px', marginTop: '10px' }}>{"Optional fields:"}</label>
              <div className="form-group step2-form">
                <label htmlFor="age">{t('age')}</label>
                <input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-control my-1"
                  id="age"
                  placeholder="Enter your age"
                />
              </div>
              <div className="form-group step2-form">
                <label htmlFor="gender">{t('gender')}</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-control my-1"
                  id="gender">
                  <option>{t('placeholder_gender')}</option>
                  <option value="m">{t('male')}</option>
                  <option value="f">{t('female')}</option>
                </select>
              </div>
              <div className="form-group step2-form">
                <label htmlFor="country">{t('country')}</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control my-1"
                  id="country"
                >
                  {countryOptions.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="next-but">Next</button>

              {error && <p className="error-msg">{error}</p>}

            </form>
          </div>
        );
      case 3:
        return (
          <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <BackArrow />
            <div className="form-container">
              <form onSubmit={handleNextStep}>
                <h1 className='step3-title'>Last details</h1>

                <h1 className='step3-subtitle'>Your intolerances
                  <Link to={`/app/allergies`}>
                    <img src={Help} alt="Help" className="help-icon" />
                  </Link>
                </h1>
                <div className="form-group">
                  {allergies.map((allergy) => (
                    <div key={`allergy-${allergy.id}`} className="form-check">
                      <input
                        type="checkbox"
                        id={`allergy-${allergy.id}`}
                        name="allergy"
                        value={allergy.id}
                        onChange={handleCheckboxes}
                        className="form-check-input"
                      />
                      <label htmlFor={`allergy-${allergy.id}`} className="form-check-label">
                        {allergy.allergy_name}
                      </label>
                    </div>
                  ))}
                </div>

                <h1 className='step3-subtitle'>Favourite markets</h1>
                <div className="form-group">
                  {markets.map((market) => (
                    <div key={`market-${market.id}`} className="form-check">
                      <input
                        type="checkbox"
                        id={`market-${market.id}`}
                        name="market"
                        value={market.id}
                        onChange={handleCheckboxes}
                        className="form-check-input"
                      />
                      <label htmlFor={`market-${market.id}`} className="form-check-label">
                        {market.name}
                      </label>
                    </div>
                  ))}
                </div>

                <h1 className='step3-subtitle'>Favourite brands</h1>
                <div className="form-group">
                  {brands.map((brand) => (
                    <div key={`brand-${brand.id}`} className="form-check">
                      <input
                        type="checkbox"
                        id={`brand-${brand.id}`}
                        name="brand"
                        value={brand.id}
                        onChange={handleCheckboxes}
                        className="form-check-input"
                      />
                      <label htmlFor={`brand-${brand.id}`} className="form-check-label">
                        {brand.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className='btn1 text-center mt-4'>
                  <button type="submit" className="next-but">Finish</button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container'>
      {renderStep()}
    </div>
  );
  
};

// Exporting Register component
export default Register;

import React, { useState, useEffect } from 'react';
import backgroundImage from "../img/clearbackground.png";
import './Register.css';
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { countries } from 'countries-list';
import { useTranslation } from 'react-i18next';
import Configration from "../components/Configration";
import i18n from "../components/i18n";
import { BACKEND_API_URL } from '../config/proxy.js';

const Register = () => {
  <Configration />
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  });

  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });

  const [iduser, setIdUser] = useState({
    iduser: ''
  });

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

  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Configration />
            <form onSubmit={handleNextStep}>
              <div className="form-group my-3">
                <label className='label1' htmlFor="exampleInputEmail1">{t("label_email")}</label>
                <br />
                <input name="email" type="email" value={formData.email} onChange={handleChange}
                  className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder={t("placeholder_text_email")} />
                <label id="errorMail" htmlFor="ErrorMail" className='invisible text-danger'>{t('email_existed')}</label>
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button
                onClick={print}
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: '-930px', marginLeft: '105px' }}
              >
                {t("next")}
              </button>

            </form>
          </div>
        );
      case 2:
        const countryOptions = [t('select_country'), ...Object.values(countries).map(country => country.name)];
        return (
          <div>
            <Configration />
            <h1 className='my-2 text-success'>{t('step2')}</h1>
            <form onSubmit={handleNextStep}>
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="password">{t('password')}</label>
                <input
                  name="password"
                  type="password"
                  value={passwords.password}
                  onChange={handlePasswords}
                  className="form-control my-1"
                  id="password"
                  placeholder={t('placeholder_password')}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="confirmPassword">{t('confirm_password')}</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswords}
                  className="form-control my-1"
                  id="confirmPassword"
                  placeholder={t('placeholder_confirm_password')}
                />
              </div>
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <button type="submit" className="btn btn-primary">Next</button>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="container">
            <div className="form-container">
              <h1>Step 3: Select Favorite Markets, Allergies, and Brands</h1>
              <form onSubmit={handleNextStep}>
                <div className="form-group">
                  <h3>Markets</h3>
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
                <div className="form-group">
                  <h3>Allergies</h3>
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
                <div className="form-group">
                  <h3>Brands</h3>
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
                  <button type="submit" className="btn btn-primary">
                    Next
                  </button>
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

export default Register;
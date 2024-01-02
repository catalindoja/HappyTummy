import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import arrowImage from "../img/arrow.png";
import './BackArrow.css';

// BackArrow component
const BackArrow = () => {
    return (
        <button className="back-arrow-button" onClick={() => window.history.back()}>
            <img src={arrowImage} alt="Back" className="back-arrow-img" />
        </button>
    )
}

// Exporting BackArrow component
export default BackArrow;
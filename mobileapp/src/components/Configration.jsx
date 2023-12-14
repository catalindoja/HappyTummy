import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n.js';
import "./Configration.css";

// Configration component
const Configration = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='configration-container my-3'>
            <select
                id="language-select"
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
            >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="ca">Catalan</option>
                <option value="ar">Arabic</option>
            </select>
        </div>
    );
};

// Exporting Configration component
export default Configration;
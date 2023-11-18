// Ejemplo de selector de idioma con elemento select
import React from 'react';
import { useTranslation } from 'react-i18next';

const Configation = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <h2 className='my-3'>General</h2>
            <label htmlFor="language-select">Select Language:</label>
            <select
                id="language-select"
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
            >
                <option value="en">English</option>
                <option value="es">Español</option>
                {/* Agrega más opciones según los idiomas que admitas */}
            </select>
        </div>
    );
};

export default Configation;

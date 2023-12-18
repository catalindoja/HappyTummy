import React from 'react';
import { useTranslation } from 'react-i18next';

// Language switcher component
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('es')}>Español</button>
        </div>
    );
};

// Exporting component so it can be used somewhere else
export default LanguageSwitcher;

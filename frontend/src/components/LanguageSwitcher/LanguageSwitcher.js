import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // Stili personalizzati

import useUser from '../../hooks/useUser';

function LanguageSwitcher(email) {
  const { i18n } = useTranslation();

  const { changeLanguage } = useUser(email.email);


  const handleChangeLanguage = (lng) => {
    changeLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        className={`language-button ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => handleChangeLanguage('en')}
      >
        English
      </button>
      <button
        className={`language-button ${i18n.language === 'it' ? 'active' : ''}`}
        onClick={() => handleChangeLanguage('it')}
      >
        Italiano
      </button>
      <button
        className={`language-button ${i18n.language === 'fr' ? 'active' : ''}`}
        onClick={() => handleChangeLanguage('fr')}
      >
        Français
      </button>
      <button
        className={`language-button ${i18n.language === 'de' ? 'active' : ''}`}
        onClick={() => handleChangeLanguage('de')}
      >
        Deutsch
      </button>
    </div>
  );
}

export default LanguageSwitcher;

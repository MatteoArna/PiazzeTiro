import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // Stili personalizzati

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        className={`language-button ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={`language-button ${i18n.language === 'it' ? 'active' : ''}`}
        onClick={() => changeLanguage('it')}
      >
        Italiano
      </button>
    </div>
  );
}

export default LanguageSwitcher;

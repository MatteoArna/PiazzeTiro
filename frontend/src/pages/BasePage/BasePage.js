import React from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Calendar from '../components/Calendar';
import '../styles/BasePage.css';

const BasePage = ({ children, showSearchBar, showCalendar }) => {
  return (
    <div className="base-page">
      <NavBar />
      <div className="content">
        {showSearchBar && <SearchBar />}
        {children}
      </div>
      {showCalendar && <Calendar />}
    </div>
  );
};

export default BasePage;

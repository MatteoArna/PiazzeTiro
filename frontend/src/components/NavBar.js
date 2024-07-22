import React from 'react';
import '../styles/Navbar.css';
import LanguageSelector from './LanguageSelector';
import userIcon from '../assets/user.png';

const Navbar = ({ username, onLogout }) => {
  return (
    <div className="navbar">
      <div className="user-info">
        <img src={userIcon} className='profile-image' alt="User"/>
        <span>{username}</span>
      </div>
      <nav>
        <ul>
          <li>Home Page</li>
          <li>Profilo</li>
          <li>Impostazioni</li>
          <li>Admin Dashboard</li>
          <li className="logout">
            <button onClick={onLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
      <div className="language-selector">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import '../styles/Navbar.css';
import LanguageSelector from './LanguageSelector';
import userIcon from '../assets/user.png';

const NavBar = ({ username, roleId, handleLogout, onHomePageClick, onAdminDashboardClick, selected }) => {
  return (
    <div className="navbar">
      <div className="user-info">
        <img src={userIcon} className='profile-image' alt="User"/>
        <span>{username}</span>
      </div>
      <nav>
        <ul>
          <li className={selected === 'home' ? 'selected' : ''} onClick={onHomePageClick}>Home Page</li>
          <li className={selected === 'profile' ? 'selected' : ''}>Profilo</li>
          <li className={selected === 'settings' ? 'selected' : ''}>Impostazioni</li>
          {roleId === 1 && (
            <li className={selected === 'admin' ? 'selected' : ''} onClick={onAdminDashboardClick}>Admin Dashboard</li>
          )}
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
      <div className="language-selector">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default NavBar;

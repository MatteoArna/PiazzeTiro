import React from 'react';
import '../styles/Navbar.css';
import LanguageSelector from './LanguageSelector';
import userIcon from '../assets/user.png';

const NavBar = ({ userData, handleLogout, onHomePageClick, onAdminDashboardClick, onProfilePageClick, selected }) => {
  return (
    <div className="navbar">
      <div className="user-info">
        <img src={userIcon} className='profile-image' alt="User"/>
        <span>{userData.username}</span>
      </div>
      <nav>
        <ul>
          <li className={selected === 'home' ? 'selected' : ''} onClick={onHomePageClick}>Home Page</li>
          <li className={selected === 'profile' ? 'selected' : ''} onClick={onProfilePageClick}>Profilo</li>
          <li className={selected === 'settings' ? 'selected' : ''}>Impostazioni</li>
          {userData.roleId === 1 && (
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

import React from 'react';
import './NavBar.css';
import userIcon from '../../assets/user.png';

const NavBar = ({ userData, handleLogout, onNewsPageClick, onAdminDashboardClick, onProfilePageClick, selected }) => {
  return (
    <div className="navbar">
      <div className="user-info">
        <img src={userIcon} className='profile-image' alt="User"/>
        <span>{userData.firstName + " " + userData.lastName}</span>
      </div>
      <nav>
        <ul>
          <li className={selected === 'news' ? 'selected' : ''} onClick={onNewsPageClick}>News Page</li>
          <li className={selected === 'profile' ? 'selected' : ''} onClick={onProfilePageClick}>Profilo</li>
          <li className={selected === 'settings' ? 'selected' : ''}>Impostazioni</li>
          {userData.roleId === 1 && (
            <li className={selected === 'admin' ? 'selected' : ''} onClick={onAdminDashboardClick}>Admin Dashboard</li>
          )}
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

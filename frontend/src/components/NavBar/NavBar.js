import React from 'react';
import './NavBar.css';
import userIcon from '../../assets/user.png';

const NavBar = ({ user, handleLogout, navigateTo, selectedPage }) => {
  return (
    <div className="navbar">
      <div className="user-info">
        <img src={userIcon} className='profile-image' alt="User" />
        <span>{user.firstName + " " + user.lastName}</span>
      </div>
      <nav>
        <ul>
          <li className={selectedPage === 'news' ? 'selected' : ''} onClick={() => navigateTo('news')}>News Page</li>
          {user.status > 1 && (
            <li className={selectedPage === 'infrastructures' ? 'selected' : ''} onClick={() => navigateTo('infrastructures')}>Infrastrutture</li>
          )}
          <li className={selectedPage === 'profile' ? 'selected' : ''} onClick={() => navigateTo('profile')}>Profilo</li>
          <li className={selectedPage === 'settings' ? 'selected' : ''} onClick={() => navigateTo('settings')}>Impostazioni</li>
          {user.roleId === 'admin' && (
            <li className={selectedPage === 'userApproval' ? 'selected' : ''} onClick={() => navigateTo('userApproval')}>Approvazione Utenti</li>
          )}
          {user.roleId === 'admin' && (
            <li className={selectedPage === 'reservations' ? 'selected' : ''} onClick={() => navigateTo('reservations')}>Prenotazioni</li>
          )}
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

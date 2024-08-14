import React from 'react';
import './NavBar.css';
import userIcon from '../../assets/user.png';

import { useTranslation } from 'react-i18next';

const NavBar = ({ user, handleLogout, navigateTo, selectedPage }) => {

  const { t } = useTranslation();

  return (
    <div className="navbar">
      <div className="user-info">
        <img src={userIcon} className='profile-image' alt="User" />
        <span>{user.firstName + " " + user.lastName}</span>
      </div>
      <nav>
        <ul>
          <li className={selectedPage === 'news' ? 'selected' : ''} onClick={() => navigateTo('news')}>{t('navigation.news_page')}</li>
          {user.status > 1 && (
            <li className={selectedPage === 'infrastructures' ? 'selected' : ''} onClick={() => navigateTo('infrastructures')}>{t('navigation.infrastructure')}</li>
          )}
          <li className={selectedPage === 'profile' ? 'selected' : ''} onClick={() => navigateTo('profile')}>{t('navigation.profile')}</li>
          {user.roleId === 'admin' && (
            <>
              <li className={selectedPage === 'userApproval' ? 'selected' : ''} onClick={() => navigateTo('userApproval')}>{t('navigation.user_approval')}</li>
              <li className={selectedPage === 'settings' ? 'selected' : ''} onClick={() => navigateTo('settings')}>{t('navigation.settings')}</li>
            </>
          )}
          {user.status === 4 && (
            <li className={selectedPage === 'reservations' ? 'selected' : ''} onClick={() => navigateTo('reservations')}>{t('navigation.reservations')}</li>
          )}
          <li><button onClick={handleLogout} className="logout-button">{t('navigation.logout')}</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

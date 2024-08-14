import React from 'react';

//Utils
import { getColor, getStatus } from '../../utils/userUtil';


import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';

import { useTranslation } from 'react-i18next';

//Styles
import './ProfilePage.css';

const ProfilePage = ({ userData }) => {


  const {t} = useTranslation();

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-info">
            <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
            <p className="status">
              <span className={`status-indicator ${getColor(userData.status)}`}></span>
              {getStatus(userData.status, t)}
            </p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>{t('profile.role')}:</strong> {t('profile.' + userData.roleId)}</p>
          <p><strong>{t('profile.firstname')}:</strong> {userData.firstName}</p>
          <p><strong>{t('profile.lastname')}:</strong> {userData.lastName}</p>
          <p><strong>E-mail:</strong> {userData.email}</p>
          {userData.society && <p><strong>{t('profile.society')}:</strong> {userData.society}</p>}
        </div>

        <div className="profile-actions">
          <LanguageSwitcher email={userData.email}/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

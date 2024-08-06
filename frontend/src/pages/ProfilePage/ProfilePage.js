import React from 'react';

//Utils
import { getColor, getStatus } from '../../utils/userUtil';


//Styles
import './ProfilePage.css';

const ProfilePage = ({ userData }) => {
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-info">
            <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
            <p className="status">
              <span className={`status-indicator ${getColor(userData.status)}`}></span>
              {getStatus(userData.status)}
            </p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>Ruolo:</strong> {userData.roleId}</p>
          <p><strong>Nome:</strong> {userData.firstName}</p>
          <p><strong>Cognome:</strong> {userData.lastName}</p>
          <p><strong>E-mail:</strong> {userData.email}</p>
          {userData.society && <p><strong>Società:</strong> {userData.society}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

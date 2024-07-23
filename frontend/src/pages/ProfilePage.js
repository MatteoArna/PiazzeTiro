import React from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = ({ userData }) => {
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-picture">
            <img src="https://via.placeholder.com/100" alt={userData.firstName + ' ' + userData.lastName} />
          </div>
          <div className="profile-info">
            <h2>{userData.firstName + ' ' + userData.lastName}</h2>
            <p className="status"><span className="status-indicator red"></span>Non approvato</p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>Ruolo:</strong> {userData.roleId}</p>
          <p><strong>Nome:</strong> {userData.firstName}</p>
          <p><strong>Congnome:</strong> {userData.lastName}</p>
          <p><strong>E-mail:</strong> {userData.email}</p>
          <p><strong>Telefono:</strong> {userData.phone}</p>
          <p><strong>Società:</strong> {userData.society}</p>
          <p><strong>Indirizzo:</strong> {userData.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

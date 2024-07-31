import React from 'react';
import '../styles/ProfilePage.css';
import civilianIcon from '../assets/profilepics/civilian.webp';
import adminIcon from '../assets/profilepics/admin.webp';


const ProfilePage = ({ userData }) => {

    const getIcon = (type) => {
        switch (type) {
            case 0:
                return civilianIcon;
            case 1:
                return adminIcon;
            default:
                return null;
        }
    }

    const getColor = (status) => {
        switch (status) {
            case 0:
                return 'red';
            case 1:
                return 'orange';
            case 2:
                return 'green';
            default:
                return null;
        }
    }

    const getStatus = (status) => {
        switch (status) {
            case 0:
                return 'Non approvato';
            case 1:
                return 'In attesa';
            case 2:
                return 'Approvato';
            default:
                return null;
        }
    }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-picture">
            <img src={getIcon(userData.roleId)} alt={userData.firstName + ' ' + userData.lastName} />
          </div>
          <div className="profile-info">
            <h2>{userData.firstName + ' ' + userData.lastName}</h2>


            <p className="status"><span className={"status-indicator " + (getColor(userData.status))}></span>{getStatus(userData.status)}</p>
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

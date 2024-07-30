import React from 'react';
import './UserBox.css';

const UserBox = ({ userData }) => {

  const translateStatus = (status) => {
    switch (status) {
      case 0:
        return 'waiting documents';
      case 1:
        return 'pending';
      case 2:
        return 'accepted';
      case 3:
        return 'rejected';
      default:
        return 'unknown';
    }
  };


  return (
    <div className="user-box">
      <div className="user-info">
      <div className="user-company">{userData.society}</div>
      <div className="user-name">{userData.firstName + " " + userData.lastName}</div>
      </div>
      <div className={`user-status ${userData.status <= 1 ? 'pending' : (userData.status > 2 ? 'rejected' : 'accepted')}`}>
        {translateStatus(userData.status)}
      </div>
      <div className="user-arrow">›</div>
    </div>
  );
};

export default UserBox;

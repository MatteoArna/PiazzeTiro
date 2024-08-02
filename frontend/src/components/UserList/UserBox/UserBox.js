import React from 'react';
import './UserBox.css';

const UserBox = ({ userData, onBoxClicked }) => {

  const translateStatus = (status) => {
    switch (status) {
      case 0:
        return 'waiting documents';
      case 1:
        return 'pending';
      case 2:
        return 'documents expired';
      case 3:
        return 'pending';
      case 4:
        return 'accepted';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 0:
        return 'pending';
      case 1:
        return 'pending';
      case 2:
        return 'rejected';
      case 3:
        return 'pending';
      case 4:
        return 'accepted';
    }
  };

  return (
    <div className="user-box" onClick={() => onBoxClicked(userData)}>
      <div className="user-info">
        <div className="user-company">{userData.society}</div>
        <div className="user-name">{userData.firstName + " " + userData.lastName}</div>
      </div>
      <div className={`user-status ${translateStatus(userData.status)}`}>
        {translateStatus(userData.status)}
      </div>
      <div className="user-arrow">›</div>
    </div>
  );
};

export default UserBox;

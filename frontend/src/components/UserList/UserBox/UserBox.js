import React from 'react';
import './UserBox.css';

const UserBox = ({ userData }) => {
  return (
    <div className="user-box">
      <div className="user-info">
      <div className="user-company">{userData.society}</div>
      <div className="user-name">{userData.firstName + " " + userData.lastName}</div>
      </div>
      <div className={`user-status ${userData.status <= 1 ? 'pending' : 'available'}`}>
        {userData.status}
      </div>
      <div className="user-arrow">›</div>
    </div>
  );
};

export default UserBox;

import React from 'react';
import UserBox from './UserBox/UserBox';
import './UserList.css';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users
        .filter(user => user.roleId !== 1) // Filter out users with roleId === 1
        .map(user => (
          <UserBox key={user.email} userData={user} />
        ))}
    </div>
  );
};

export default UserList;

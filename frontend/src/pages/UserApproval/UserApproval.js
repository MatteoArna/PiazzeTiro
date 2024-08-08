import React, { useState, useEffect } from 'react';

// Components
import UserDetails from '../../components/UserList/HelpBox/UserDetails';
import GeneralList from '../../components/GeneralList/GeneralList';

// Hooks
import useUserApproval from '../../hooks/custom/userApprovalPage/useUserApproval';

// Styles
import './UserApproval.css';

const UserApproval = ({userData}) => {

  const { users, elements, loading, error, onUserSelected, selectedUser } = useUserApproval(userData.email);
  
  return (
    <div className='main-content'>
      <div className='user-container'>
        <GeneralList
          listElements={elements}
        />
      </div>
      <div className='user-details-container'>
        {selectedUser && <UserDetails user={selectedUser} />}
      </div>
    </div>
  );
};

export default UserApproval;

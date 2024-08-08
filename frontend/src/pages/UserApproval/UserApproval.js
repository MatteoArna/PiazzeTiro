import React, { useState, useEffect } from 'react';

// Components
import UserDetails from '../../components/UserList/HelpBox/UserDetails';
import GeneralList from '../../components/GeneralList/GeneralList';

// Hooks
import useUserApproval from '../../hooks/custom/userApprovalPage/useUserApproval';

// Styles
import './UserApproval.css';

const UserApproval = ({userData}) => {

  const { elements, loading, error, onUserClicked, selectedUser, changeRole } = useUserApproval(userData.email);
  
  return (
    <div className='mainContent'>
      <div className='user-container'>
        <GeneralList
          listElements={elements}
          onElementClicked={onUserClicked}
        />
      </div>
      <div className='user-details-container'>
        <UserDetails user={selectedUser} onChangeRole={changeRole} />
      </div>
    </div>
  );
};

export default UserApproval;
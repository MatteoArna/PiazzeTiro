import React, { useState, useEffect } from 'react';

// Components
import UserList from '../../components/UserList/UserList';
import UserDetails from '../../components/UserList/HelpBox/UserDetails';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

// Styles
import './UserApproval.css';

const UserApproval = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { loadAllUsers } = useUser(auth.email);

  useEffect(() => {
    loadAllUsers(auth.token).then((users) => {
      setUsers(users);
    });
  }, [loadAllUsers, auth.token]);

  const onUserSelected = (user) => {
    setSelectedUser(user);
  }

  return (
    <div className='mainContent'>
      <div className='user-list-container'>
        <UserList users={users} onUserClicked={(user) => onUserSelected(user)} />
      </div>
      <div className='user-details-container'>
        {selectedUser && <UserDetails user={selectedUser} />}
      </div>
    </div>
  );
};

export default UserApproval;

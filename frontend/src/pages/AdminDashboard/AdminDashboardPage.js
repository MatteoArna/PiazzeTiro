import React, { useState, useEffect } from 'react';

// Components
import UserList from '../../components/UserList/UserList';
import UserDetails from '../../components/UserList/HelpBox/UserDetails';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

// Styles
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { loadAllUsers } = useUser(auth.email);

  useEffect(() => {
    loadAllUsers(auth.token).then((users) => {
      setUsers(users);
      console.log(users);
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

export default AdminDashboardPage;

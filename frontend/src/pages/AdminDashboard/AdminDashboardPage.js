// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import UserList from '../../components/UserList/UserList';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

const AdminDashboardPage = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const { loadAllUsers } = useUser(auth.email);

  useEffect(() => {
    loadAllUsers(auth.token).then((users) => {
      setUsers(users);
      console.log(users);
    });
  }, [loadAllUsers, auth.token]); // Lista di dipendenze corretta

  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default AdminDashboardPage;

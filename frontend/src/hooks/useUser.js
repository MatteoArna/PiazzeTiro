import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsers, fetchUserById, setUserToNextStatus, changeUserRole, removeUserApproval, approveUser } from '../services/userService';

const useUser = (email = null) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAllUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkIfUserIsExpired = (user) => {
    // check if user.updatedAt is in the previous year
    const currentYear = new Date().getFullYear();
    const updatedAtYear = new Date(user.updatedAt).getFullYear();
    return currentYear - updatedAtYear > 0;
  }

  const loadUserById = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUserById(email);
      if(checkIfUserIsExpired(response.data)){
        console.log("User is expired");
        removeUserApproval(email);
      }
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (email) {
      loadUserById(email);
    }else{
      loadAllUsers();
    }
  }, [email, loadUserById, loadAllUsers]);

  const handleSetUserToNextStatus = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      await setUserToNextStatus(email);
      loadUserById(email);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangeRole = useCallback(async (email = null, roleId) => {
    console.log("Changing role to " + roleId);
    setLoading(true);
    setError(null);
    try {
      await changeUserRole(email, roleId);

      if(roleId === '0'){
        console.log("Removing approval");
        removeUserApproval(email);
      }else{
        approveUser(email);
      }

      loadAllUsers();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    user, 
    users, 
    loading, 
    error, 
    loadAllUsers,
    loadUserById,
    setUserToNextStatus: handleSetUserToNextStatus,
    changeRole: handleChangeRole
  };
};

export default useUser;
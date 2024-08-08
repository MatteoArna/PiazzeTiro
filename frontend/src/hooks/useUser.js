import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsers, fetchUserById, setUserToNextStatus } from '../services/userService';

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

  const loadUserById = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUserById(email);
      setUser(response.data);
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
      const response = await setUserToNextStatus(email);
      loadUserById(email);
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
  };
};

export default useUser;

import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsers, fetchUserById, updateUserStatus } from '../services/userService';

const useUser = (email = null) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    }
  }, [email, loadUserById]);

  const updateUser = useCallback(async (email, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUserStatus(email, data);
      setUser(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  return { 
    user, 
    users, 
    loading, 
    error, 
    updateUser,
    loadAllUsers 
  };
};

export default useUser;

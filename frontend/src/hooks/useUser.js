import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsers, fetchUserData, updateUserStatus } from '../services/userService';

const useUser = (email) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetchUserData(email);
        setUserData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [email]);

  const updateUser = async (data) => {
    try {
      const response = await updateUserStatus(email, data);
      setUserData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const loadAllUsers = useCallback(async (token) => {
    try {
      const response = await fetchAllUsers(token);
      return response.data;
    } catch (err) {
      setError(err);
      return [];
    }
  }, []);

  return { userData, loading, error, updateUser, loadAllUsers };
};

export default useUser;

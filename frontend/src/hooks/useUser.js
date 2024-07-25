import { useState, useEffect } from 'react';
import { fetchUserData } from '../services/userService';

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

  return { userData, loading, error };
};

export default useUser;

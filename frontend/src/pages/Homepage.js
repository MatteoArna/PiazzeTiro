import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const Homepage = () => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${auth.email}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (auth.email) {
      fetchUserData();
    }
  }, [auth.email, auth.token]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Benvenuto {userData.firstName} {userData.lastName}: {userData.roleId}</h1>
    </div>
  );
};

export default Homepage;

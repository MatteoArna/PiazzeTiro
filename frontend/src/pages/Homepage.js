import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Calendar from '../components/Calendar';
import HomePageContent from '../components/HomePageContent';
import '../styles/Homepage.css';

const Homepage = () => {
  const { auth, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState([]);

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

    const fetchPages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pages`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        console.log("response==>", response);
        setPages(response.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    if (auth.email) {
      fetchUserData();
      fetchPages();
    }
  }, [auth.email, auth.token]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="homepage">
      <Navbar username={`${userData.firstName} ${userData.lastName}`} onLogout={logout} />
      <div className="main-content">
        <SearchBar />
        <HomePageContent pages={pages} />
      </div>
      <Calendar />
    </div>
  );
};

export default Homepage;

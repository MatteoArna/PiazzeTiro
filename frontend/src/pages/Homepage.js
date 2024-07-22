import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Calendar from '../components/Calendar';
import HomePageContent from '../components/HomePageContent';
import Admindashboard from '../pages/Admindashboard';
import CreateNewsModal from '../components/CreateNewsModal';
import '../styles/Homepage.css';

const Homepage = () => {
  const { auth, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  const handleShowModal = () => {
    setShowModal(true);
    setIsClosing(false);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
    }, 500); // Durata dell'animazione in ms
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="homepage">
      <NavBar 
        username={`${userData.firstName} ${userData.lastName}`} 
        roleId={userData.roleId}
        handleLogout={logout}
        onHomePageClick={() => setSelected('home')}
        onAdminDashboardClick={() => setSelected('admin')}
        selected={selected}
      />
      <div className="main-content">
        <SearchBar />
        {userData.roleId === 1 && (
          <button className="add-news-button" onClick={handleShowModal}>+</button>
        )}
        {selected === 'admin' ? <Admindashboard /> : <HomePageContent pages={pages} />}
        {showModal && <CreateNewsModal onClose={handleCloseModal} isClosing={isClosing} />}
      </div>
      <Calendar />
    </div>
  );
};

export default Homepage;

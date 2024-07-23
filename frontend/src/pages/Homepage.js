import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Calendar from '../components/Calendar';
import HomePageContent from '../components/HomePageContent';
import Admindashboard from '../pages/Admindashboard';
import CreateNewsModal from '../components/CreateNewsModal';
import ProfilePage from './ProfilePage';
import '../styles/Homepage.css';

const Homepage = () => {
  const { auth, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pageTypes, setPageTypes] = useState([]);
  const [currentEditPage, setCurrentEditPage] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${auth.email}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log('User data:', response.data);
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
        setPages(response.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    const fetchPageTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pageTypes`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setPageTypes(response.data);
      } catch (error) {
        console.error('Error fetching page types:', error);
      }
    };

    if (auth.email) {
      fetchUserData();
      fetchPages();
      fetchPageTypes();
    }
  }, [auth.email, auth.token]);

  const handleShowModal = () => {
    setCurrentEditPage(null);
    setShowModal(true);
    setIsClosing(false);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
    }, 500); // Durata dell'animazione in ms
  };

  const handleEditPage = (page) => {
    setCurrentEditPage(page);
    setShowModal(true);
    setIsClosing(false);
  };

  const handleDeletePage = async (pageId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/pages/${pageId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPages(pages.filter(page => page.id !== pageId));
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="homepage">
      <NavBar 
        userData={userData}
        //username={`${userData.firstName} ${userData.lastName}`} 
        //roleId={userData.roleId}
        handleLogout={logout}
        onHomePageClick={() => setSelected('home')}
        onAdminDashboardClick={() => setSelected('admin')}
        onProfilePageClick={() => setSelected('profile')}
        selected={selected}
      />
      <div className="main-content">
        <SearchBar />
        {userData.roleId === 1 && (
          <button className="add-news-button" onClick={handleShowModal}>+</button>
        )}
        {selected === 'admin' ? <Admindashboard /> : (selected === 'profile' ? <ProfilePage userData={userData} /> : <HomePageContent pages={pages} onEditPage={handleEditPage} onDeletePage={handleDeletePage} isAdmin={userData.roleId === 1} />)}
        {showModal && (
          <CreateNewsModal 
            ref={modalRef} 
            onClose={handleCloseModal} 
            isClosing={isClosing} 
            pageTypes={pageTypes} 
            editPage={currentEditPage}
          />
        )}
      </div>
      <Calendar />
    </div>
  );
};

export default Homepage;

import React, { createElement, useRef, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Calendar from '../components/Calendar/Calendar';
import Admindashboard from '../pages/Admindashboard';
import CreateNewsModal from '../components/News/CreateNewsModal';
import ProfilePage from './ProfilePage';
import '../styles/Homepage.css';

// Components
import NewsPage from '../components/News/NewsPage';

// Hooks
import { useAuth } from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import usePages from '../hooks/usePages';
import { createPage } from '../services/pageService';

const BasePage = () => {
  const { auth, logout } = useAuth();
  const { userData, loading, error } = useUser(auth.email);

  const [selected, setSelected] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentEditPage, setCurrentEditPage] = useState(null);
  const modalRef = useRef(null);

  if (loading) {
    return <div className="base-page">Loading...</div>;
  }

  if (error) {
    logout();
  }


  return (
    <div className="homepage">
      <NavBar 
        userData={userData}
        handleLogout={logout}
        onHomePageClick={() => setSelected('home')}
        onAdminDashboardClick={() => setSelected('admin')}
        onProfilePageClick={() => setSelected('profile')}
        selected={selected}
      />

      <div className="main-content">
        <SearchBar />

        {userData.roleId === 1 && (
          <button className="add-news-button" onClick={() => setShowModal(true)}>+</button>
        )}


        {selected === 'home' && <NewsPage userData={userData}/>}
        {selected === 'admin' && <Admindashboard />}
        {selected === 'profile' && <ProfilePage userData={userData} />}
      </div>
      <Calendar />
    
      {showModal && (
        <CreateNewsModal 
          ref={modalRef} 
          onClose={() => setShowModal(false)} 
          onSubmit={(page) => createPage(auth.token, page)}
        />
      )}
    </div>
  );
};

export default BasePage;

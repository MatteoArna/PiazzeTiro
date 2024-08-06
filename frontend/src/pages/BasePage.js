import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import DocumentUploader from '../components/DocumentUploader/DocumentUploader';
import NavBar from '../components/NavBar/NavBar';
import { useAuth } from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import useNavigation from '../hooks/custom/useNavigation';

import NewsPage from './NewsPage/NewsPage';
import UserApproval from './UserApproval/UserApproval';
import ProfilePage from './ProfilePage/ProfilePage'
import InfratructurePage from './InfrastructurePage/InfratructurePage';
import ReservationPage from '../components/Reservations/ReservationPage';

import './BasePage.css';

const BasePage = () => {
  const { auth, logout } = useAuth();
  const { user, loading, error } = useUser(auth.email);
  const { selectedPage, navigateTo } = useNavigation('profile');

  if (loading) {
    return <div className="base-page">Loading...</div>;
  }

  if (error) {
    logout();
  }

  return (
    <div className="homepage">
      <NavBar 
        user={user}
        handleLogout={logout}
        navigateTo={navigateTo}
        selectedPage={selectedPage}
      />

      <div className="main-content">
        {selectedPage === 'news' && <NewsPage userData={user} />}
        {selectedPage === 'userApproval' && <UserApproval />}
        {selectedPage === 'profile' && <ProfilePage userData={user} />}
        {selectedPage === 'infrastructures' && <InfratructurePage userData={user} />}
        {selectedPage === 'reservations' && <ReservationPage token={auth.token} />}
      </div>

      <div>
        {(selectedPage === 'news' || selectedPage === 'infrastructures') && <Calendar userData={user} />}
        {selectedPage === 'profile' && user.roleId === 0 && <DocumentUploader userData={user} />}
      </div>
    </div>
  );
};

export default BasePage;

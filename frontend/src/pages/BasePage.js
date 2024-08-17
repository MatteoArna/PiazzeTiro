import React, {useEffect} from 'react';
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
import ReservationPage from './ReservationPage/ReservationPage';
import SettingsPage from './SettingsPage/SettingsPage';

import { useTranslation } from 'react-i18next';

/*
CadeBox: CadeBox con o senza bersagli (50 e 60)
Piazze: Bersaglio ora * tipo (senza prezzo infrastruttura)

-> Date
-> Mail

-> Mappa Interattiva
*/

import './BasePage.css';

const BasePage = () => {
  const { auth, logout } = useAuth();
  const { user, loading, error } = useUser(auth.email);
  const { selectedPage, navigateTo } = useNavigation('profile');

  const { i18n } = useTranslation();


  useEffect(() => {
    if (user && user.language) {
      i18n.changeLanguage(user.language);
    }
    console.log('user', user);
  }, [user, i18n]);

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
        {selectedPage === 'userApproval' && <UserApproval userData={user}/>}
        {selectedPage === 'profile' && <ProfilePage userData={user} />}
        {selectedPage === 'infrastructures' && <InfratructurePage userData={user} />}
        {selectedPage === 'reservations' && <ReservationPage showUserReservation={user && user.roleId !== 'admin'} />}
        {selectedPage === 'settings' && <SettingsPage />}
      </div>


      <div>
        {(selectedPage === 'news' || selectedPage === 'infrastructures') && <Calendar userData={user} />}
        {selectedPage === 'profile' && user.roleId === 'civilian' && <DocumentUploader userData={user} />}
      </div>
    </div>
  );
};

export default BasePage;

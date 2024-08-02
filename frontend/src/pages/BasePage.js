import React, { useState } from 'react';

// Components
import Calendar from '../components/Calendar/Calendar';
import DocumentUploader from '../components/DocumentUploader/DocumentUploader';
import NavBar from '../components/NavBar/NavBar';

// Hooks
import { useAuth } from '../hooks/useAuth';
import useUser from '../hooks/useUser';

//Pages
import NewsPage from '../components/News/NewsPage';
import UserApproval from './UserApproval/UserApproval';
import ProfilePage from './ProfilePage';

//Style
import './BasePage.css';
import InfratructurePage from '../components/Infrastructures/InfratructurePage';


const BasePage = () => {
  const { auth, logout } = useAuth();
  const { userData, loading, error } = useUser(auth.email);
  const [selected, setSelected] = useState('profile');



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
        onNewsPageClick={() => setSelected('news')}
        onUserApprovalClick={() => setSelected('userApproval')}
        onProfilePageClick={() => setSelected('profile')}
        onInfrastructurePageClick={() => setSelected('infrastructures')}
        selected={selected}
      />

      <div className="main-content">
        {selected === 'news' && <NewsPage userData={userData}/>}
        {selected === 'userApproval' && <UserApproval />}
        {selected === 'profile' && <ProfilePage userData={userData} />}
        {selected === 'infrastructures' && <InfratructurePage userData={userData}/>}
      </div>

      <div>
        {(selected === 'news' || selected === 'infrastructures') && <Calendar />}
        {selected === 'profile' && userData.roleId !== 1 && <DocumentUploader userData={userData}/>}
      </div>
  
    </div>
  );
};

export default BasePage;

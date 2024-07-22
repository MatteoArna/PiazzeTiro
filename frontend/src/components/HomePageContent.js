import React from 'react';
import '../styles/HomePageContent.css';
import manutenzioneIcon from '../assets/maintenance.png';
import documentiIcon from '../assets/info.png';
import sicurezzaIcon from '../assets/warning.png';

const HomePageContent = ({ pages }) => {

  const getIcon = (type) => {
    switch (type) {
      case 0:
        return documentiIcon;
      case 1:
        return sicurezzaIcon;
      case 2:
        return manutenzioneIcon;
      default:
        return null;
    }
  };

  const getType = (type) => {
    switch (type) {
      case 0:
        return 'Informazioni';
      case 1:
        return 'Attenzione';
      case 2:
        return 'Manutenzione';
      default:
        return null;
    }
  }

  return (
    <div className="homepage-content">
      {pages.map((page) => (
        <div className="card" key={page.id}>
          <div className="card-icon">
            <img src={getIcon(page.typeId)} alt={page.type} />
          </div>
          <div className="card-content">
            <h3>{getType(page.typeId)}</h3>
            <p>{page.content}</p>
            <a href="#">Più informazioni</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageContent;

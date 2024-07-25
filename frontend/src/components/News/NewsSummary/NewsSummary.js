import React, { useState } from 'react';
import { showAlert } from '../../../components/Alert'; // Importa il nuovo componente Alert

// Components
import NewsDetailsModal from '../NewsDetailsModal/NewsDetailsModal';

// Icons
import maintenanceIcon from '../../../assets/maintenance.png';
import infoIcon from '../../../assets/info.png';
import warningIcon from '../../../assets/warning.png';

// Styles
import './NewsSummary.css';

const NewsSummary = ({ page, isAdmin, onEditPage, onDeletePage }) => {
  const [showModal, setShowModal] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 0:
        return infoIcon;
      case 1:
        return warningIcon;
      case 2:
        return maintenanceIcon;
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
  };

  return (
    <div className="news-summary">
      <div className="card" key={page.id}>
        <div className="card-icon">
          <img src={getIcon(page.typeId)} alt={page.type} />
        </div>
        <div className="card-content">
          <h3>{getType(page.typeId)}</h3>
          <p>{page.summary}</p>
          <a href="#" onClick={() => setShowModal(true)}>Più informazioni</a>
          {isAdmin && (
            <>
              <button className="edit-button" onClick={() => onEditPage(page)}>Modifica</button>
              <button className="delete-button" onClick={() => onDeletePage(page.id)}>Elimina</button>
            </>
          )}
        </div>
      </div>
      {showModal && (
        <NewsDetailsModal
          page={page}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default NewsSummary;

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { showAlert } from '../components/Alert'; // Importa il nuovo componente Alert
import '../styles/HomePageContent.css';
import manutenzioneIcon from '../assets/maintenance.png';
import documentiIcon from '../assets/info.png';
import sicurezzaIcon from '../assets/warning.png';
import PageDetailsModal from './PageDetailsModal';

const HomePageContent = ({ pages, onEditPage, onDeletePage, isAdmin }) => {
  const { auth } = useAuth();
  const [selectedPage, setSelectedPage] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  };

  const handleShowModal = (page) => {
    setSelectedPage(page);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPage(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/pages/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      showAlert('success', 'Pagina eliminata con successo!');

      setTimeout(() => {
        window.location.reload(); // Ricarica la pagina per mostrare la modifica
      }, 2000); // Attendere 2 secondi prima di ricaricare

      handleCloseModal();
    } catch (error) {
      console.error('Error deleting page:', error);
      showAlert('error', 'Errore nella eliminazione della pagina', error.response ? error.response.data.message : 'Si è verificato un problema, riprova più tardi.');
    }
  };

  return (
    <div className="homepage-content">
      {pages.map((page) => (
        <div className="card" key={page.id}>
          <div className="card-icon">
            <img src={getIcon(page.typeId)} alt={page.type} />
          </div>
          <div className="card-content">
            <h3>{getType(page.typeId)}</h3>
            <p>{page.summary}</p>
            <a href="#" onClick={() => handleShowModal(page)}>Più informazioni</a>
            {isAdmin && (
              <>
                <button className="edit-button" onClick={() => onEditPage(page)}>Modifica</button>
                <button className="delete-button" onClick={() => handleDelete(page.id)}>Elimina</button>
              </>
            )}
          </div>
        </div>
      ))}
      {showModal && selectedPage && (
        <PageDetailsModal
          page={selectedPage}
          onClose={handleCloseModal}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default HomePageContent;

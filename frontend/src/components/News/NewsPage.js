import React, { useState } from 'react';

// Components
import NewsSummary from './NewsSummary/NewsSummary';
import CreateNewsModal from './CreateNewsModal/CreateNewsModal';
import { showAlert } from '../Alert';

// Styles
import './NewsPage.css';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import usePages from '../../hooks/usePages';

const NewsPage = ({ userData }) => {
  const { auth } = useAuth();
  const { pages, loading, error, reloadPages, createPage, updatePage, deletePage } = usePages(auth.token);
  const [showModal, setShowModal] = useState(false);
  const [pageToEdit, setPageToEdit] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading pages.</div>;
  }

  const openCreateModal = () => {
    setPageToEdit(null);
    setShowModal(true);
  };

  const openEditModal = (page) => {
    setPageToEdit(page);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPageToEdit(null);
  };

  const handleOperation = async (operation, successMessage, errorMessage, ...args) => {
    try {
      await operation(...args);
      showAlert('success', successMessage);
      await reloadPages(); // Ricarica le pagine dopo l'operazione
    } catch (error) {
      showAlert('error', errorMessage);
    } finally {
      handleModalClose();
    }
  };

  const handleSubmit = async (pageData) => {
    if (pageToEdit) {
      await handleOperation(
        updatePage,
        'Pagina aggiornata con successo',
        'Errore durante l\'aggiornamento della pagina',
        pageToEdit.id,
        pageData
      );
    } else {
      await handleOperation(
        createPage,
        'Pagina creata con successo',
        'Errore durante la creazione della pagina',
        pageData
      );
    }
  };

  const handleDeletePage = async (id) => {
    await handleOperation(
      deletePage,
      'Pagina eliminata con successo',
      'Errore durante l\'eliminazione della pagina',
      id
    );
  };

  return (
    <div>
      {userData.roleId === 1 && (
        <button className="add-news-button" onClick={openCreateModal}>+</button>
      )}
      <div className="news-container">
        {pages.map((page) => (
          <NewsSummary
            key={page.id}
            page={page}
            isAdmin={userData.roleId === 1}
            onEditPage={openEditModal}
            onDeletePage={handleDeletePage}
          />
        ))}
        {showModal && (
          <CreateNewsModal
            page={pageToEdit}
            onClose={handleModalClose}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default NewsPage;

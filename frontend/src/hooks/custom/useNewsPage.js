import { useState, useCallback } from 'react';
import { showAlert } from '../../components/Alert';
import usePages from '../usePages';

const useNewsPage = () => {
  const { pages, pageTypes, loading, error, createPage, updatePage, deletePage } = usePages();

  const [pageToEdit, setPageToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openCreateModal = () => {
    setShowModal(true);
  };

  const openEditModal = (page) => {
    setPageToEdit(page);
    setShowModal(true);
  };

  const closeModal = () => {
    setPageToEdit(null);
    setShowModal(false);
  };

  const handleOperation = useCallback(async (operation, successMessage, errorMessage, ...args) => {
    try {
      await operation(...args);
      showAlert('success', successMessage);
    } catch (error) {
      showAlert('error', errorMessage);
    } finally {
      closeModal();
    }
  }, []);

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

  return {
    pages,
    pageTypes,
    loading,
    error,

    openCreateModal,
    openEditModal,
    closeModal,

    showModal,
    pageToEdit,
    
    handleSubmit,
    handleDeletePage,
  };
};

export default useNewsPage;

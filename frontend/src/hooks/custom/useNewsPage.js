import { useState, useCallback } from 'react';
import { showAlert } from '../../components/Alert';
import usePages from '../usePages';

import { useTranslation } from 'react-i18next';

const useNewsPage = () => {
  const { pages, pageTypes, loading, error, createPage, updatePage, deletePage } = usePages();

  const [pageToEdit, setPageToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

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
    if (pageData.get('file') !== null) {
        const file = pageData.get('file'); // Prendi il file originale
        const fileExtension = file.name.split('.').pop(); // Estrai l'estensione del file
        const randomNum = Math.floor(Math.random() * 1000000); // Genera un numero casuale
        const newFileName = `${file.name.split('.')[0]}-${randomNum}.${fileExtension}`; // Crea il nuovo nome del file

        console.log("Content of pageData: ", pageData);
        
        const renamedFile = new File([file], newFileName, {
            type: file.type
        });

        // Rimuovi il file originale da pageData
        pageData.delete('file');
        // Aggiungi il file rinominato
        pageData.append('file', renamedFile, renamedFile.name);
    }

    if (pageToEdit) {
        await handleOperation(
            updatePage,
            t('news_page.edit_success'),
            t('news_page.edit_error'),
            pageToEdit.id,
            pageData
        );
    } else {
        await handleOperation(
            createPage,
            t('news_page.creation_success'),
            t('news_page.creation_error'),
            pageData
        );
    }
  };



  const handleDeletePage = async (id) => {
    await handleOperation(
      deletePage,
      t('news_page.delete_success'),
      t('news_page.delete_error'),
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

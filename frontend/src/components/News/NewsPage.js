import React, { useState } from 'react';

// Components
import NewsSummary from './NewsSummary/NewsSummary';
import CreateNewsModal from './CreateNewsModal';

// Styles
import './NewsPage.css';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import usePages from '../../hooks/usePages';
import { deletePage, updatePage } from '../../services/pageService';

const NewsPage = ({ userData }) => {
  const { auth } = useAuth();
  const { pages, loading, error, reloadPages } = usePages(auth.token);
  const [showModal, setShowModal] = useState(false);
  const [pageToEdit, setPageToEdit] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading pages.</div>;
  }

  const handleEditPage = (page) => {
    setShowModal(true);
    setPageToEdit(page);
  };

  const handleSubmit = async (pageData) => {
    await updatePage(auth.token, pageToEdit.id, pageData);
    await reloadPages(); // Ricarica le pagine dopo l'aggiornamento
  };

  return (
    <div className="news-page">
      
      {pages.map((page) => (
        <NewsSummary
          key={page.id}
          page={page}
          isAdmin={userData.roleId === 1}
          onEditPage={handleEditPage}
          onDeletePage={(id) => deletePage(auth.token, id)}
        />
      ))}
      {showModal && (
        <CreateNewsModal
          page={pageToEdit}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default NewsPage;

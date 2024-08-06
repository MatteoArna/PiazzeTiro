import React from 'react';

// Components
import NewsSummary from '../../components/News/NewsSummary/NewsSummary';
import CreateNewsModal from '../../components/News/CreateNewsModal/CreateNewsModal';

// Styles
import './NewsPage.css';

// Hooks
import useNewsPage from '../../hooks/custom/useNewsPage';

const NewsPage = ({ userData }) => {
  const {
    pages,
    pageTypes,
    loading,
    error,
    showModal,
    pageToEdit,
    openEditModal,
    openCreateModal,
    closeModal,
    handleSubmit,
    handleDeletePage,
  } = useNewsPage();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading pages.</div>;
  }

  return (
    <div>
      {userData.roleId === 'admin' && (
        <button className="add-news-button" onClick={openCreateModal}>+</button>
      )}
      <div className="news-container">
        {pages.map((page) => (
          <NewsSummary
            key={page.id}
            page={page}
            isAdmin={userData.roleId === 'admin'}
            onEditPage={openEditModal}
            onDeletePage={handleDeletePage}
          />
        ))}
        {showModal && (
          <CreateNewsModal
            page={pageToEdit}
            onClose={closeModal}
            onSubmit={handleSubmit}
            pageTypes={pageTypes}
          />
        )}
      </div>
    </div>
  );
};

export default NewsPage;

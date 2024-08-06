import React, { useState, useEffect } from 'react';
import { getIcon } from '../../../utils/newsUtil';
import './NewsSummary.css';
import InfoModal from '../../InfoModal/InfoModal';
import useFile from '../../../hooks/data/useFile';

const NewsSummary = ({ page, isAdmin, onEditPage, onDeletePage }) => {
  const [showModal, setShowModal] = useState(false);
  const { fileUrl, isImage, handleFetchFile } = useFile();

  useEffect(() => {
    if (showModal && page.file) {
      handleFetchFile(page.file);
    }
  }, [showModal, page.file, handleFetchFile]);

  return (
    <div className="news-summary">
      <div className="card" key={page.id}>
        <div className="card-icon">
          <img src={getIcon(page.typeId)} alt={page.typeId} />
        </div>
        <div className="card-content">
          <h3>{page.typeId}</h3>
          <p>{page.summary}</p>
          <a href="#" onClick={() => setShowModal(true)}>Più informazioni</a>
          {isAdmin && (
            <AdminControls
              page={page}
              onEditPage={onEditPage}
              onDeletePage={onDeletePage}
            />
          )}
        </div>
      </div>
      {showModal && (
        <InfoModal
          title={page.typeId}
          subtitle={page.summary}
          content={page.content}
          icon={getIcon(page.typeId)}
          file={fileUrl}
          showPreview={isImage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const AdminControls = ({ page, onEditPage, onDeletePage }) => (
  <>
    <button className="edit-button" onClick={() => onEditPage(page)}>Modifica</button>
    <button className="delete-button" onClick={() => onDeletePage(page.id)}>Elimina</button>
  </>
);

export default NewsSummary;

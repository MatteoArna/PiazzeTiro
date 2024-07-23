import React from 'react';
import Markdown from 'markdown-to-jsx';
import '../styles/PageDetailsModal.css';
import manutenzioneIcon from '../assets/maintenance.png';
import documentiIcon from '../assets/info.png';
import sicurezzaIcon from '../assets/warning.png';

const PageDetailsModal = ({ page, onClose }) => {
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

  const isImage = (filePath) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const extension = filePath.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <img src={getIcon(page.typeId)} alt={getType(page.typeId)} />
          <h3>{getType(page.typeId)}</h3>
        </div>
        <div className="modal-summary">
          {page.summary}
        </div>
        <hr />
        <div className="modal-content-text">
          <Markdown>{page.content}</Markdown>
        </div>
        {page.file && (
          <div className="modal-file-preview">
            {isImage(page.file) ? (
              <img src={`${process.env.REACT_APP_API_URL}/uploads/${page.file.split('/').pop()}`} alt="Preview" className="file-preview" />
            ) : (
              <a href={`${process.env.REACT_APP_API_URL}/uploads/${page.file.split('/').pop()}`} download className="file-download">Download File</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailsModal;

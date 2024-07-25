import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

// Components
import Modal from '../../Modal/Modal';

// Icons
import maintenanceIcon from '../../../assets/maintenance.png';
import infoIcon from '../../../assets/info.png';
import warningIcon from '../../../assets/warning.png';

// Styles
import './NewsDetailsModal.css';

//Other
import { getAuthToken } from '../../../services/authService';

const NewsDetailsModal = ({ page, onClose }) => {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (page.file) {
      fetchFile(page.file);
    }
  }, [page.file]);

  const fetchFile = async (filePath) => {
    const token = getAuthToken();
    try {
      const response = await fetch(filePath, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setFileUrl(url);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

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

  const isImage = (filePath) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const extension = filePath.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  return (
    <Modal title={getType(page.typeId)} isOpen={true} onClose={onClose}>
      <div className="modal-header">
        <img src={getIcon(page.typeId)} alt={getType(page.typeId)} className="modal-icon" />
      </div>
      <div className="modal-summary">
        {page.summary}
      </div>
      <hr />
      <div className="modal-content-text">
        <Markdown>{page.content}</Markdown>
      </div>
      {fileUrl && (
        <div className="modal-file-preview">
          {isImage(page.file) ? (
            <img src={fileUrl} alt="Preview" className="file-preview" />
          ) : (
            <a href={fileUrl} download className="file-download">Download File</a>
          )}
        </div>
      )}
    </Modal>
  );
};

export default NewsDetailsModal;

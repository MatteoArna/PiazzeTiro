import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import './InfoModal.css';

const InfoModal = ({ title, subtitle, content, icon, file, onClose, showPreview }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Aggiungi la classe al body quando il modal è aperto
    document.body.classList.add('modal-open');

    // Rimuovi la classe dal body quando il modal viene chiuso
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  useEffect(() => {
    if (file && showPreview) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // Clean up the URL when the component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file, showPreview]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-header">
          {icon && <img src={icon} alt="Icon" className="modal-icon" />}
          <div>
            <h2>{title}</h2>
            {subtitle && <h3>{subtitle}</h3>}
          </div>
        </div>
        <div className="modal-content-text">
          <Markdown>{content}</Markdown>
        </div>
        {file && (
          <div className="modal-file-preview">
            {showPreview ? (
              imageUrl ? (
                <img src={imageUrl} alt="Preview" className="file-preview" />
              ) : (
                <p>Loading preview...</p>
              )
            ) : (
              <a href={imageUrl || file} download className="file-download">Download File</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoModal;

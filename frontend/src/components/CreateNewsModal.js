import React, { forwardRef } from 'react';
import '../styles/CreateNewsModal.css';

const CreateNewsModal = forwardRef(({ onClose, isClosing }, ref) => {
  return (
    <div className={`modal-overlay ${isClosing ? 'fadeOut' : ''}`}>
      <div className={`modal-content ${isClosing ? 'scaleOut' : ''}`} ref={ref}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Modal per creare una news</h2>
        {/* Contenuto del modal */}
      </div>
    </div>
  );
});

export default CreateNewsModal;

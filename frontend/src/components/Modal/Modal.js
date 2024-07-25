import React from 'react';
import './Modal.css';

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;

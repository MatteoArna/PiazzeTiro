import React from 'react';
import '../styles/DocumentUploader.css';

const DocumentUploader = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Gestisci il caricamento del file qui
    console.log('File uploaded:', file);
  };

  return (
    <div className="document-uploader">
      <h2>Stato Approvazione</h2>
      <div className="document-boxes">
        <div className="document-box green">
          <label>
            Formulario Società
            <input type="file" onChange={handleFileUpload} />
          </label>
          <span className="status-icon">✔️</span>
        </div>
        <div className="document-box orange">
          <label>
            Formulario Assicurazione
            <input type="file" onChange={handleFileUpload} />
          </label>
          <span className="status-icon">🕒</span>
        </div>
        <div className="document-box red">
          <label>
            Visto Associazione Mantello
            <input type="file" onChange={handleFileUpload} />
          </label>
          <span className="status-icon">⬆️</span>
        </div>
      </div>
      <p><strong>Stato:</strong> In attesa dei documenti</p>
    </div>
  );
};

export default DocumentUploader;

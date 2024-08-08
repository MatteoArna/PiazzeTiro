import React, { useState, useEffect } from 'react';
import './FileContainer.css';

const FileContainer = ({ file, fileName, initialState, fileType, onUpload, onDelete, onDownload }) => {
  const [status, setStatus] = useState(initialState);

  useEffect(() => {
    if (file && initialState === 'toLoad') {
      setStatus('preview');
      console.log(file);
    } else {
      setStatus(initialState); // Aggiungi questa riga per aggiornare lo stato
    }
  }, [file, initialState]);

  const handleDeleteFile = () => {
    setStatus('toLoad');
    onDelete(file);
  };

  const handleUploadFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === fileType) {
      const renamedFile = new File([selectedFile], `${fileName}`, {
        type: fileType
      });
      setStatus('preview');
      onUpload(renamedFile);
    } else {
      console.log('Invalid file type.');
    }
  };

  const handleDownloadFile = () => {
    onDownload(file);
  }

  return (
    <div className={`file-container ${status}`}>
      {status === 'toLoad' && (
        <>
          <div className="file-info">Carica <i>{fileName}</i></div>
          <input
            type="file"
            accept={fileType}
            style={{ display: 'none' }}
            id={`file-upload-${fileName}`}
            onChange={handleUploadFile}
          />
          <label htmlFor={`file-upload-${fileName}`} className="file-action upload-action">📤</label>
        </>
      )}
      {status === 'preview' && (
        <>
          <div className="file-info">{fileName}.{fileType.split('/')[1]}</div>
          <button className="file-action download-action" onClick={handleDownloadFile}>📥</button>
          <button className="file-action delete-action" onClick={handleDeleteFile}>❌</button>
        </>
      )}
      {status === 'waiting' && (
        <>
          <div className="file-info">{fileName}.{fileType.split('/')[1]}</div>
          <button className="file-action download-action" onClick={handleDownloadFile}>📥</button>
        </>
      )}
      {status === 'accepted' && (
        <>
          <div className="file-info">{fileName}.{fileType.split('/')[1]}</div>
          <button className="file-action download-action" onClick={handleDownloadFile}>📥</button>
        </>
      )}
    </div>
  );
};

export default FileContainer;

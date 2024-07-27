import React, { useState, useEffect } from 'react';
import { fetchFile } from '../../services/fileService';
import './FileContainer.css';
import { saveAs } from 'file-saver';

const FileContainer = ({ file, userEmail, fileName, initialState, fileType, onUpload, onDelete }) => {
  const [status, setStatus] = useState(initialState);

    useEffect(() => {
        if (file && initialState === 'toLoad') {
            setStatus('preview');
        }
    }, [file, initialState]);


  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === fileType) {
      const currentYear = new Date().getFullYear();
      const renamedFile = new File([selectedFile], `${userEmail}-${fileName}-${currentYear}.${fileType.split('/')[1]}`, {
        type: fileType
      });
      setStatus('preview');
      onUpload(renamedFile);
    } else {
      console.log('Invalid file type.');
    }
  };

  const handleDeleteFile = () => {
    setStatus('toLoad');
    onDelete(file);
  };

  const handleDownloadFile = async () => {
    const response = await fetchFile(file);
    saveAs(response, file);
  };

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
            onChange={handleFileUpload}
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

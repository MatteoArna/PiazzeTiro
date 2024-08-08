import React, { useState, useEffect } from 'react';

// Hooks
import useDocumentHelper from '../../hooks/custom/userApprovalPage/useDocumentHelper';

// Styles
import './DocumentUploader.css';

// Components
import FileContainer from '../FileContainer/FileContainer';

//Utils
import { getDocumentName } from '../../utils/userUtil';


const DocumentUploader = ({ userData, adminFile }) => {
  const { 
    documents, 
    loading, 
    error, 
    status, 
    uploadDocument, 
    deleteDocument, 
    downloadFile,
    submitDocuments
  } = useDocumentHelper(userData.email);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading documents</div>;
  }

  const handleSubmitDocuments = async () => {
    await submitDocuments();
    // Forza un refresh
    window.location.reload();
  }

  return (
    <div className='document-uploader'>
      {documents.length > 0 && documents.map((doc, index) => (
        <FileContainer
          key={index}
          file={doc.filePath}
          fileType={'application/pdf'}
          initialState={status}
          fileName={getDocumentName(index)}
          onDownload={() => downloadFile(doc.filePath)}
          onDelete={() => deleteDocument(doc.filePath)}
          onUpload={uploadDocument}
        />
      ))}
      {
        (userData.status === 0 || userData.status === 2) && (
          <button className="submit-button" onClick={handleSubmitDocuments}>Invia File</button>
        )
      }
    </div>
  );
};

export default DocumentUploader;

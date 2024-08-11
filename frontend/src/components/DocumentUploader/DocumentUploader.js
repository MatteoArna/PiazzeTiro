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
      {[0, 1].map((index) => (
        <FileContainer
          key={index}
          file={documents[index]?.filePath}
          fileType={'application/pdf'}
          initialState={status}
          fileName={getDocumentName(index)}
          onDownload={() => downloadFile(documents[index]?.filePath)}
          onDelete={() => deleteDocument(documents[index]?.filePath)}
          onUpload={uploadDocument}
        />
      ))}

      {
        documents[2] && (
          <FileContainer
            file={documents[2]?.filePath}
            fileType={'application/pdf'}
            initialState={status}
            fileName={getDocumentName(2)}
            onDownload={() => downloadFile(documents[2]?.filePath)}
            onDelete={() => deleteDocument(documents[2]?.filePath)}
            onUpload={uploadDocument}
          />
        )
      }
      {
        (userData.status === 0 || userData.status === 2) && (
          <button className="submit-button" onClick={handleSubmitDocuments}>Invia File</button>
        )
      }
    </div>
  );
};

export default DocumentUploader;

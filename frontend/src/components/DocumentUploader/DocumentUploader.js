import React, { useState, useEffect } from 'react';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import useDocument from '../../hooks/useDocument';
import useUser from '../../hooks/useUser';


// Styles
import './DocumentUploader.css';

// Components
import FileContainer from '../FileContainer/FileContainer';
import { showAlert } from '../Alert'


const DocumentUploader = ({ userData, adminFile }) => {
  const { auth } = useAuth();
  const { documents, loading, error, loadDocuments, uploadDocument, deleteDocument } = useDocument(auth.token);
  const { updateUser } = useUser(userData.email);

  useEffect(() => {
    if (userData.email) {
      loadDocuments(userData.email);
    }
  }, [userData.email]);

  const handleOnUpload = async (file) => {
    const documentData = new FormData();
    const fileName = file.fileName;
    documentData.append('file', file, fileName);
    documentData.append('userId', userData.email);

    try {
      await uploadDocument(documentData);
      loadDocuments(userData.email);
      showAlert('success', 'File caricato con successo.');
    }catch (err) {
      showAlert('error', 'Errore durante il caricamento del file.');
    }
  };

  const handleOnDelete = async (file) => {
    console.log('File deleted:', file);
    for (const document of documents) {
      if (document.filePath === file) {
        try{
          await deleteDocument(document.id);
          showAlert('success', 'File eliminato con successo.');
        }catch (err) {
          showAlert('error', 'Errore durante l\'eliminazione del file.');
        }
      }
    }
    loadDocuments(userData.email);
  };

  const handleSubmitDocuments = async () => {
    console.log(documents.length)
    if (documents.length < 2) {
      showAlert('error', 'Devi caricare entrambi i file per poter procedere.');
      return;
    }

    updateUser({ status: 1 });
    showAlert('success', 'Documenti inviati con successo.');

  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading documents</div>;
  }

  return (
    <div className="document-uploader">
      <h2>Stato Approvazione</h2>
      <div className="document-boxes">
        
        <FileContainer
          file={documents[0] && documents[0].filePath}
          userEmail={userData.email}
          fileName="Formulario"
          initialState={(userData.status > 0) ? 'waiting' : 'toLoad'}
          fileType="application/pdf"
          onUpload={(file) => handleOnUpload(file)}
          onDelete={(file) => handleOnDelete(file)}
        />

        <FileContainer
          file={documents[1] && documents[1].filePath}
          userEmail={userData.email}
          fileName="Polizza Assicurativa"
          initialState={(userData.status > 0) ? 'waiting' : 'toLoad'}
          fileType="application/pdf"
          onUpload={(file) => handleOnUpload(file)}
          onDelete={(file) => handleOnDelete(file)}
        />

        <hr />

        {
          (userData.status === 0) && (
            <button className="submit-button" onClick={handleSubmitDocuments} >Invia File </button>
          )
        }

        {
          (userData.status === 2) && ( 
            <FileContainer
              file={documents[2] && documents[2].filePath}
              userEmail={userData.email}
              fileName="Decisione"
              initialState={'accepted'}
              fileType="application/pdf"
            />
          )
        }

      </div>
    </div>
  );
};

export default DocumentUploader;
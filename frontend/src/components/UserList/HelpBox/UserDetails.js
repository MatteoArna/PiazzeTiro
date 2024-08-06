import React, { useEffect, useState } from 'react';
import './UserDetails.css';
import FileContainer from '../../FileContainer/FileContainer';

//Hooks
import { useAuth } from '../../../hooks/useAuth';
import useDocument from '../../../hooks/useDocument';
import useUser from '../../../hooks/useUser';
import { showAlert } from '../../Alert';

const UserDetails = ({ user }) => {

  const { auth } = useAuth();
  const { documents, loading, error, loadDocuments, uploadDocument, deleteDocument } = useDocument(auth.token);
  const {updateUser} = useUser(user.email);

  useEffect(() => {
    if(user.email){
      loadDocuments(user.email);
    }
  }, [user.email]);

  const handleOnUpload = async (file) => {
    const documentData = new FormData();
    const fileName = file.fileName;
    documentData.append('file', file, fileName);
    documentData.append('userId', user.email);

    try {
      await uploadDocument(documentData);
      loadDocuments(user.email);
      showAlert('success', 'File caricato con successo.');
    } catch (err) {
      console.log(err);
      showAlert('error', 'Errore durante il caricamento del file.');
    }
  };

  const handleOnDelete = async (file) => {
    for (const document of documents) {
      if (document.filePath === file) {
        try {
          await deleteDocument(document.id);
          showAlert('success', 'File eliminato con successo.');
        } catch (err) {
          console.log(err);
          showAlert('error', 'Errore durante l\'eliminazione del file.');
        }
      }
    }
    loadDocuments(user.email);
  };

  const activateUser = async () => {
    try {
      await updateUser({status: 2});
      showAlert('success', 'Utente approvato con successo.');
    } catch (err) {
      console.log(err);
      showAlert('error', 'Errore durante l\'approvazione dell\'utente.');
    }
  }
  return (
    <div className="user-details">
      <h2 className="user-name">{user.firstName + " " + user.lastName}</h2>
      <p className="user-info"><b>{user.society}</b></p>
      <p className="user-info">Status: {user.status}</p>

      <div className="document-boxes">

        { user.status === 0 &&
        
          <h1>Waiting for documents</h1>
        
        }

        { user.status >= 1 &&
          <>
            <FileContainer 
              file={documents[0] && documents[0].filePath}
              userEmail={user.email}
              fileName="Formulario"
              initialState={'waiting'}
              fileType={'application/pdf'}
            />

            <FileContainer 
              file={documents[1] && documents[1].filePath}
              userEmail={user.email}
              fileName="Polizza Assicurativa"
              initialState={'waiting'}
              fileType={'application/pdf'}
            />

            <FileContainer
              file={documents[2] && documents[2].filePath}
              userEmail={user.email}
              fileName="Decisione"
              initialState={(user.status === 2 ? 'accepted' : (documents[2] === null ? 'waiting' : 'toLoad'))}
              fileType={'application/pdf'}
              onUpload={(file) => handleOnUpload(file)}
              onDelete={(file) => handleOnDelete(file)}
            />


            {
              user.status < 2 &&
              <button
              className="submit-button"
              disabled={user.status !== 1}
              onClick={activateUser}
              >
                Approva Utente
              </button>
            }

            
          </>



        }

      </div>
    </div>
  );
};

export default UserDetails;

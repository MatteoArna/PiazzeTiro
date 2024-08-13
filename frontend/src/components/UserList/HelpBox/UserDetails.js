import React, {useEffect, useState} from 'react';
import './UserDetails.css';

import FileContainer from '../../FileContainer/FileContainer';

import useDetailPage from '../../../hooks/custom/userApprovalPage/useDetailPage';
import useDocumentHelper from '../../../hooks/custom/userApprovalPage/useDocumentHelper';

import { getDocumentName } from '../../../utils/userUtil';

import { useTranslation } from 'react-i18next';

const UserDetails = ({ user, onChangeRole }) => { 

  const {t} = useTranslation();

  const { society, name, email, status: userStatus, roles} = useDetailPage(user);

  const { documents, loading, error, status, uploadDocument, deleteDocument, downloadFile, submitDocuments } = useDocumentHelper(user?.email);

  const [selectedRole, setSelectedRole] = React.useState(user?.roleId);

  const handleChangeRole = (roleId) => {
    setSelectedRole(roleId);
    onChangeRole(roleId);
  }

  useEffect(() => {
    setSelectedRole(user?.roleId);
  }, [user]);

  if(!user){
    return(
      <h1>{t('user_approval.no_data')}</h1>
    )
  }
  return (
    <div className="user-details">
      <h2 className="user-society">{society}</h2>
      <p className="user-info"><i>{userStatus}</i></p>
      <p className="user-info">{name}</p>
      <p className='user-info'><b>{email}</b></p>

      <hr />


      <p className='user-info'>{t('user_approval.attual_role')}</p>
      <select 
        className="role-select" 
        value={selectedRole}
        onChange={(event) => {
          handleChangeRole(event.target.value);
        }}
      >
        {roles.map(role => (
          <option className="role-select-option" key={role.id} value={role.id}>
            {t('profile.' + role.role)}
          </option>
        ))}
      </select>

      <hr />

      <p className='user-info'>{t('documents.documents')}</p>

      {
  selectedRole === 0 && (
    <>
      {documents.length > 0 && documents.map((doc, index) => (
        index < 2 && (
          <FileContainer
            key={index}
            file={doc.filePath}
            fileType={'application/pdf'}
            initialState={status}
            fileName={getDocumentName(index, t)}
            onDownload={() => downloadFile(doc.filePath)}
            onDelete={() => deleteDocument(doc.filePath)}
            onUpload={uploadDocument}
          />
        )
      ))}
      {documents.length >= 2 && (
        <FileContainer
          file={documents[2] && documents[2].filePath}
          fileType={'application/pdf'}
          initialState={status === 'accepted' ? 'accepted' : 'toLoad'}
          fileName={getDocumentName(2, t)}
          onDownload={downloadFile}
          onDelete={deleteDocument}
          onUpload={uploadDocument}
        />
      )}
      {status !== 'accepted' && documents.length > 1 && (
        <button className="submit-button" onClick={submitDocuments}>{t('documents.send_documents')}</button>
      )}
    </>
  )
}




    {/*}
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
      {*/}
    </div>
  );
};

export default UserDetails;
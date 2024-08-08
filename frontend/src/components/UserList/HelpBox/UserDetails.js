import React, {useEffect, useState} from 'react';
import './UserDetails.css';


import useDetailPage from '../../../hooks/custom/userApprovalPage/useDetailPage';

const UserDetails = ({ user, onChangeRole }) => { 

  const { society, name, email, status, roles} = useDetailPage(user);


  const [selectedRole, setSelectedRole] = React.useState(user?.roleId);

  const handleChangeRole = (roleId) => {
    setSelectedRole(roleId);
    onChangeRole(roleId);
  }

  useEffect(() => {
    setSelectedRole(user?.roleId);
    console.log(user);
  }, [user]);

  if(!user){
    return(
      <h1>Seleziona un utente per vederne i dettagli</h1>
    )
  }
  return (
    <div className="user-details">
      <h2 className="user-society">{society}</h2>
      <p className="user-info"><i>{status}</i></p>
      <p className="user-info">{name}</p>
      <p className='user-info'><b>{email}</b></p>

      <hr />


      <p className='user-info'>Ruolo attuale</p>
      <select 
        className="role-select" 
        value={selectedRole}
        onChange={(event) => {
          handleChangeRole(event.target.value);
        }}
      >
        {roles.map(role => (
          <option className="role-select-option" key={role.id} value={role.id}>
            {role.role}
          </option>
        ))}
      </select>



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
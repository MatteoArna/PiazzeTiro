import React, { useState } from 'react';
import Modal from '../../Modal/Modal';

const ReservationModal = ({ onClose, onSubmit, userData, infrastructureType, infrastructures, users = [] }) => {
  const [date, setDate] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [infrastructure, setInfrastructure] = useState('');
  const [user, setUser] = useState('');
  const [target, setTarget] = useState('');

  console.log(infrastructureType);

  //Only for civilians
  const [nPartecipants, setNPartecipants] = useState(0);

  const handleReservation = async () => {
    const reservationData = {
      idCustomer: user ? user : userData.email,
      infrastructureType: infrastructureType.id,
      status: 1,
      date,
      start: hourStart,
      end: hourEnd,
      nPartecipants,
      idInfrastructure: infrastructure,
      price: infrastructureType.price,
      target,
    };

    onSubmit(reservationData);
    onClose();
  };

  return (
    <Modal title="Crea Prenotazione" isOpen={true} onClose={onClose}>
      <div className='form-group'>
        <label htmlFor='date'>Data</label>
        <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className='form-group'>
        <label htmlFor='hours'>Orario di inizio</label>
        <input type='time' id='hourStart' value={hourStart} onChange={(e) => setHourStart(e.target.value)} step='900' required />
      </div>

      <div className='form-group'>
        <label htmlFor='hours'>Orario di fine</label>
        <input type='time' id='hourEnd' value={hourEnd} onChange={(e) => setHourEnd(e.target.value)} step='900' required />
      </div>

      <div className='form-group'>
        <label htmlFor='infrastructure'>Infrastruttura</label>
        <select id='infrastructure' value={infrastructure} onChange={(e) => setInfrastructure(e.target.value)} required>
          <option value=''>Seleziona un'infrastruttura</option>
          {infrastructures.map((infrastructure) => (
            <option key={infrastructure.id} value={infrastructure.id}>{infrastructure.name}</option>
          ))}
        </select>
      </div>

      {
        userData.roleId === 'civilian' && (
          <>
            <div className='form-group'>
              <label htmlFor='nPartecipants'>Numero Partecipanti</label>
              <input type='number' id='nPartecipants' value={nPartecipants} onChange={(e) => setNPartecipants(e.target.value)} required />
            </div>
          </>
        )
      }

      <div className='form-group'>
        <select id='target' value={target} onChange={(e) => setTarget(e.target.value)} required>
          <option value=''>Seleziona un target</option>
        {
          infrastructureType.targets.map((target) => (
            <option key={target.targetId} value={target.targetId}>{target.target}</option>
          ))
        }
        </select>
      </div>
        
      {
        userData.roleId === 'admin' && (
          <div className='form-group'>
            <label htmlFor='user'>Utenti</label>
            <select id='user' value={user} onChange={(e) => setUser(e.target.value)} required>
              <option value=''>Seleziona un utente</option>
              {users.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.society + " (" + user.firstName + " " + user.lastName + ")"}
                </option>
              ))}

            </select>
          </div>

        )}

     
      <button onClick={handleReservation}>Crea Prenotazione</button>
    </Modal>
  );
};

export default ReservationModal;

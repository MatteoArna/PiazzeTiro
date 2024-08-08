import React, { useState } from 'react';
import Modal from '../../Modal/Modal';

const ReservationModal = ({ onClose, onSubmit, userData, infrastructureType, infrastructures }) => {
  const [date, setDate] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [infrastructure, setInfrastructure] = useState('');

  //Only for civilians
  const [nPartecipants, setNPartecipants] = useState(0);

  const handleReservation = async () => {
    const reservationData = {
      idCustomer: userData.email,
      infrastructureType: infrastructureType.id,
      status: 1,
      date,
      start: hourStart,
      end: hourEnd,
      nPartecipants,
      idInfrastructure: infrastructure,
      price: infrastructureType.price,
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
        userData.roleId !== 'army' && (
          <>
            <div className='form-group'>
              <label htmlFor='nPartecipants'>Numero Partecipanti</label>
              <input type='number' id='nPartecipants' value={nPartecipants} onChange={(e) => setNPartecipants(e.target.value)} required />
            </div>
          </>
        )
      }

     
      <button onClick={handleReservation}>Crea Prenotazione</button>
    </Modal>
  );
};

export default ReservationModal;

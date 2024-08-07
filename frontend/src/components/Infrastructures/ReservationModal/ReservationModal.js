import React, { useState } from 'react';
import Modal from '../../Modal/Modal';

const ReservationModal = ({ onClose, onSubmit, userData, infrastructureType, infrastructures }) => {
  const [date, setDate] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [infrastructure, setInfrastructure] = useState(null);

  const [sDate, setSDate] = useState(null);
  const [sHourStart, setSHourStart] = useState(null);
  const [sHourEnd, setSHourEnd] = useState(null);
  const [nPartecipants, setNPartecipants] = useState(null);

  const handleReservation = async () => {
    const reservationData = {
      idCustomer: userData.email,
      infrastructureType: infrastructureType.id,
      status: userData.roleId === 'army' ? 4 : 1,
      date,
      start: hourStart,
      end: hourEnd,
      subDate: sDate,
      subStart: sHourStart,
      subEnd: sHourEnd,
      nPartecipants,
      idInfrastructure: infrastructure,
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

      {
        (infrastructures.length > 0) && (
          <div className='form-group'>
            <label htmlFor='infrastructure'>Infrastruttura</label>
            <select id='infrastructure' value={infrastructure} onChange={(e) => setInfrastructure(e.target.value)} required>
              <option value=''>Seleziona un'infrastruttura</option>
              {infrastructures.map((infrastructure) => (
                <option key={infrastructure.id} value={infrastructure.id}>{infrastructure.name}</option>
              ))}
            </select>
          </div>
        )
      }

      {
        userData.roleId !== 'army' && (
          <>
            <div className='form-group'>
              <label htmlFor='sDate'>Data Sostitutiva</label>
              <input type='date' id='sDate' value={sDate} onChange={(e) => setSDate(e.target.value)} required />
            </div>

            <div className='form-group'>
              <label htmlFor='hours'>Orario di inizio sostitutivo</label>
              <input type='time' id='sHourStart' value={sHourStart} onChange={(e) => setSHourStart(e.target.value)} step='900' required />
            </div>

            <div className='form-group'>
              <label htmlFor='hours'>Orario di fine sostitutivo</label>
              <input type='time' id='sHourEnd' value={sHourEnd} onChange={(e) => setSHourEnd(e.target.value)} step='900' required />
            </div>

            <div className='form-group'>
              <label htmlFor='nPartecipants'>Numero Partecipanti</label>
              <input type='number' id='nPartecipants' value={nPartecipants} onChange={(e) => setNPartecipants(e.target.value)} required />
            </div>
          </>
        )
      }

      {/*}
      {userData.roleId !== 'civilian' && infrastructure && (
        <div className="form-group">
          <label htmlFor="hours">{infrastructure.name}</label>
        </div>  
      )}
      
      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='hours'>Orario di inizio</label>
        <input
          type='time'
          id='hourStart'
          value={hourStart}
          step='900'
          onChange={(e) => setHourStart(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor='hours'>Orario di fine</label>
        <input
          type='time'
          id='hourEnd'
          value={hourEnd}
          onChange={(e) => setHourEnd(e.target.value)}
          step='900'
          required
        />
      </div>
      {userData.roleId === 0 && (
        <>
          <div className="form-group">
            <label htmlFor="sDate">Data Sostitutiva</label>
            <input
              type="date"
              id="sDate"
              value={sDate}
              onChange={(e) => setSDate(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='hours'>Orario di inizio sostitutivo</label>
            <input
              type='time'
              id='sHourStart'
              value={sHourStart}
              step='900'
              onChange={(e) => setSHourStart(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='hours'>Orario di fine sostitutivo</label>
            <input
              type='time'
              id='sHourEnd'
              value={sHourEnd}
              onChange={(e) => setSHourEnd(e.target.value)}
              step='900'
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nPartecipants">Numero Partecipanti</label>
            <input
              type="number"
              id="nPartecipants"
              value={nPartecipants}
              onChange={(e) => setNPartecipants(e.target.value)}
              required
            />
          </div>  
        </>
      )}
      
      {*/}
      <button onClick={handleReservation}>Crea Prenotazione</button>
    </Modal>
  );
};

export default ReservationModal;

import React, { useState } from 'react';
import Modal from '../../Modal/Modal';

const ReservationModal = ({ isOpen, onClose, onSubmit, userData, infrastructure }) => {
  const [date, setDate] = useState(null);
  const [hourStart, setHourStart] = useState(null);
  const [hourEnd, setHourEnd] = useState(null);

  const [sDate, setSDate] = useState(null);
  const [sHourStart, setSHourStart] = useState(null);
  const [sHourEnd, setSHourEnd] = useState(null);
  const [nPartecipants, setNPartecipants] = useState(null);

  const handleReservation = async () => {
    if (!date || !hourStart || !hourEnd) {
      alert('Compila tutti i campi');
      return;
    }

    const reservationData = {
      idCustomer: userData.email,
      idInfrastructure: (userData.roleId === 'army' && infrastructure ? infrastructure.id : null),
      price: (userData.roleId === 'army' && infrastructure ? infrastructure.price : null),
      date: date,
      status: (userData.roleId === 'army' ? 4 : 1),
      infrastructureType: infrastructure ? infrastructure.typeId : null,
      start: hourStart,
      end: hourEnd,
      subDate: sDate,
      subStart: sHourStart,
      subEnd: sHourEnd,
      nPartecipants: nPartecipants,
      idHeadQuarter: infrastructure ? infrastructure.headquarterId : null,
    };

    onSubmit(reservationData);
    onClose();
  };

  return (
    <Modal title="Crea Prenotazione" isOpen={isOpen} onClose={onClose}>
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
      
      <button onClick={handleReservation}>Crea Prenotazione</button>
    </Modal>
  );
};

export default ReservationModal;

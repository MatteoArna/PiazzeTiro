import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import { useAuth } from '../../../hooks/useAuth';
import useBooking from '../../../hooks/useBooking';
import { saveAs } from 'file-saver';
import { fetchFile } from '../../../services/fileService';

const ReservationModal = ({ isOpen, onClose, onSubmit, userData, infrastructure }) => {
  const [date, setDate] = useState(null);
  const [hourStart, setHourStart] = useState(null);
  const [hourEnd, setHourEnd] = useState(null);

  const [sDate, setSDate] = useState(null);
  const [sHourStart, setSHourStart] = useState(null);
  const [sHourEnd, setSHourEnd] = useState(null);
  const [nPartecipants, setNPartecipants] = useState(null);

  const { auth } = useAuth();
  const { createBooking } = useBooking(auth.token);

  const handleReservation = async () => {
    if (!date || !hourStart || !hourEnd) {
      alert('Compila tutti i campi');
      return;
    }

    const reservationData = {
      idCustomer: userData.email,
      idInfrastructure: (userData.roleId === 3 ? infrastructure.id : null),
      price: (userData.roleId === 3 ? infrastructure.price : null),
      date: date,
      status: (userData.roleId === 3 ? 4 : 1),
      infrastructureType: infrastructure.typeId,
      start: hourStart,
      end: hourEnd,
      subDate: sDate,
      subStart: sHourStart,
      subEnd: sHourEnd,
      nPartecipants: nPartecipants,
      idHeadQuarter: infrastructure.headquarterId,
    };

    console.log(reservationData);

    await createBooking(reservationData);
    onClose();
    onSubmit();
    //await modifyPdf(date, userData.email, "0761234567");
  };

  const modifyPdf = async (date, email, phone) => {
    const url = 'http://localhost:3000/uploads/ComandaBersagli.pdf';
    const response = await fetchFile(url); 
    saveAs(response, 'Comanda_bersagli.pdf');
  };

  return (
    <Modal title="Crea Prenotazione" isOpen={isOpen} onClose={onClose}>
      {userData.roleId !== 0 && (
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

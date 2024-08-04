import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import { useAuth } from '../../../hooks/useAuth';
import useBooking from '../../../hooks/useBooking';
import { saveAs } from 'file-saver';
import { fetchFile } from '../../../services/fileService';

const ReservationModal = ({ isOpen, onClose, onSubmit, userData, infrastructure }) => {
  const [date, setDate] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');

  const { auth } = useAuth();
  const { createBooking } = useBooking(auth.token);

  const handleReservation = async () => {
    if (!date || !hourStart || !hourEnd) {
      alert('Compila tutti i campi');
      return;
    }

    const reservationData = {
      idCustomer: userData.email,
      idInfrastructure: infrastructure.id,
      price: infrastructure.price,
      date: date,
      status: 2,
      infrastructureType: infrastructure.typeId,
      start: hourStart,
      end: hourEnd,
    };

    await createBooking(reservationData);
    onClose();
    onSubmit();
    await modifyPdf(date, userData.email, "0761234567");
  };

  const modifyPdf = async (date, email, phone) => {
    const url = 'http://localhost:3000/uploads/ComandaBersagli.pdf';
    const response = await fetchFile(url); 
    saveAs(response, 'Comanda_bersagli.pdf');
  };

  return (
    <Modal title="Crea Prenotazione" isOpen={isOpen} onClose={onClose}>
      <div className="form-group">
        <label htmlFor="hours">{infrastructure.name}</label>
      </div>
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
      <button onClick={handleReservation}>Crea Prenotazione</button>
    </Modal>
  );
};

export default ReservationModal;

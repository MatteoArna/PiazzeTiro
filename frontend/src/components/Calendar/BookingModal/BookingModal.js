import React from 'react';
import Modal from '../../Modal/Modal';

const BookingModal = ({ booking, onClose, searchHeadquarter, searchInfrastructure, searchInfrastructureType }) => {
  return (
    <Modal title="Dettagli Riservazione" isOpen={!!booking} onClose={onClose}>
      <div className="booking-details">
        <p>ID Cliente: {booking.idCustomer}</p>
        <p>Infrastruttura: {booking.idInfrastructure ? searchInfrastructure(booking.idInfrastructure) : 'Non definita'}</p>
        <p>Sede: {searchHeadquarter(booking.idInfrastructure)}</p>
        <p>Tipo Infrastruttura: {searchInfrastructureType(booking.infrastructureType)}</p>
        {booking.price && <p>Prezzo: {booking.price} chf/h</p>}
        <p>Data: {booking.date}</p>
        {booking.subDate && <p>Substitute Date: {booking.subDate}</p>}
        <p>Ora Inizio: {booking.start}</p>
        <p>Ora Fine: {booking.end}</p>
        {booking.subStart && <p>Substitute Start: {booking.subStart}</p>}
        {booking.subEnd && <p>Substitute End: {booking.subEnd}</p>}
        {booking.nPartecipants && booking.nPartecipants > 0 && <p>Numero di Partecipanti: {booking.nPartecipants}</p>}
        <p>Status: {booking.status}</p>
      </div>
    </Modal>
  );
};

export default BookingModal;

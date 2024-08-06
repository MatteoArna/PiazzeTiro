import React from 'react';
import './ReservationDetails.css';

const ReservationDetails = ({ reservation }) => {

    if(!reservation.subDate){
        return (
            <div className="reservation-details">
                <div className='detail'>
                    <span className='label'>Troop:</span>
                    <span className="value">{reservation.User.society}</span>
                </div>
                <div className="detail">
                    <span className="label">Infrastructure:</span>
                    <span className="value">{reservation.Infrastructure.name + " (" + reservation.InfrastructureType.type + ")"}</span>
                </div>
                <div className="detail">
                    <span className="label">Period:</span>
                    <span className="value">{reservation.start + " - " + reservation.end}</span>
                </div>
                <div className="detail">
                    <span className='label'>Comanda Bersagli</span>
                    <span className="value">Da aggiungere</span>
                </div>
            </div>
        );
    }

    return (
        <div className="reservation-details">
            <div className="detail">
                <span className="label">Infrastructure:</span>
                <span className="value">{reservation.InfrastructureType.type}</span>
            </div>
            <div className="detail">
                <span className="label">Period:</span>
                <span className="value">{reservation.start + " - " + reservation.end}</span>
            </div>
            <div className="detail">
                <span className="label">Sub-Date:</span>
                <span className="value">{reservation.subDate}</span>
            </div>
            <div className="detail">
                <span className="label">Sub-Period:</span>
                <span className="value">{reservation.subStart + " - " + reservation.subEnd}</span>
            </div>
            <div className="detail">
                <span className="label">Participants:</span>
                <span className="value">{reservation.nPartecipants}</span>
            </div>
            <div className='detail'>
                <span className='label'>Contact:</span>
                <span className="value">{reservation.idCustomer}</span>
            </div>
        </div>
    );
};

export default ReservationDetails;

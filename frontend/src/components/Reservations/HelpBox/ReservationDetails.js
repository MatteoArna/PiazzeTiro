import React from 'react';
import './ReservationDetails.css';

import useReservationApprover from '../../../hooks/custom/useReservationApprover';
const ReservationDetails = ({ reservation }) => {

    const { translateDate, infrastructures, translateTime } = useReservationApprover(reservation);

    if(!reservation.subDate){
        return (
            <div className="reservation-details">
                <div className='detail'>
                    <span className='label'>Troop:</span>
                    <span className="value">{reservation.User.society}</span>
                </div>
                <div className="detail">
                    <span className="label">Infrastructure</span>
                    <span className="value">{reservation.Infrastructure ? reservation.Infrastructure.name : reservation.InfrastructureType.type }</span>
                </div>
                <div className="detail">
                    <span className="label">Period:</span>
                    <span className="value">{translateTime(reservation.start) + " - " + translateTime(reservation.end)}</span>
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
                <span className='label'>Infrastrutture disponibili:</span>
                <select className='select'>
                    {infrastructures.map((infrastructure, index) => {
                        return <option className='value' key={index} value={infrastructure.id}>{infrastructure.name}</option>
                    }
                    )}
                </select>
            </div>
            <div className="detail">
                <span className="label">Period:</span>
                <span className="value">{translateTime(reservation.start) + " - " + translateTime(reservation.end)}</span>
            </div>
            <div className="detail">
                <span className="label">Sub-Date:</span>
                <span className="value">{translateDate(reservation.subDate)}</span>
            </div>
            <div className="detail">
                <span className="label">Sub-Period:</span>
                <span className="value">{translateTime(reservation.subStart) + " - " + translateTime(reservation.subEnd)}</span>
            </div>
            <div className="detail">
                <span className="label">Participants:</span>
                <span className="value">{reservation.nPartecipants}</span>
            </div>
            <div className='detail'>
                <span className='label'>Contact:</span>
                <span className="value">{reservation.idCustomer}</span>
            </div>

            {
                reservation.status === 1 && (
                    <div className='detail'>
                        <button className='approve-button'>Approva</button>
                        <button className='approve-button'>Approva Date Sostitutive</button>
                        <button className='reject-button'>Reject</button>                        
                    </div>
                )
            }
        </div>
    );
};

export default ReservationDetails;

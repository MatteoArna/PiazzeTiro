import React from 'react';
import './ReservationDetails.css';

import useReservationApprover from '../../../hooks/custom/useReservationApprover';
const ReservationDetails = ({ reservation }) => {

    const {translateTime } = useReservationApprover(reservation);

    return (
        <div className="reservation-details">
            <span className="value">{reservation.User.society}</span>
            <div className="detail">
                <span className="label">Contact</span>
                <span className="value">{reservation.idCustomer }</span>
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

            {
                reservation.nPartecipants > 0 && (
                    <div className="detail">
                        <span className="label">Participants:</span>
                        <span className="value">{reservation.nPartecipants}</span>
                    </div>
                )
            }
            
        </div>
    );
};

export default ReservationDetails;

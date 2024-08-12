import React, {useState} from 'react';
import './ReservationDetails.css';

import useReservationApprover from '../../../hooks/custom/useReservationApprover';
const ReservationDetails = ({ reservation, onDeleteReservation, isAdmin = false }) => {

    const { translateTime } = useReservationApprover(reservation);

    const [motivation, setMotivation] = React.useState('');

    const handleDeleteReservation = (e) => {
        e.preventDefault();
        if(!motivation)
            return;
        const data = {
            id: reservation.id,
            motivation: motivation
        }
        onDeleteReservation(data);
    }

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

            {
                reservation.nPartecipants > 0 && (
                    <div className="detail">
                        <span className="label">Participants:</span>
                        <span className="value">{reservation.nPartecipants}</span>
                    </div>
                )
            }

            <div className="detail">
                <span className="label">Target:</span>
                <span className="value">{reservation.Target.name}</span>
            </div>

            {
                reservation.price > 0 && (
                    <div className="detail">
                        <span className="label">Price:</span>
                        <span className="value">{reservation.price} chf</span>
                    </div>
            )}

            {
                isAdmin && !reservation.motivation && (
                    <form onSubmit={handleDeleteReservation}>
                        <label className="label">Cancel Reservation</label>
                        <textarea
                            className="motivation-textarea"
                            placeholder="Motivation"
                            value={motivation}
                            onChange={(e) => setMotivation(e.target.value)}
                            required
                        ></textarea>
                        <button className="delete-button" type="submit">Delete</button>
                    </form>
                )
            }

            {
                reservation.motivation && (
                    <div className="detail">
                        <span className="label">Motivation:</span>
                        <span className="value">{reservation.motivation}</span>
                    </div>
                )
            }
            

            
            
        </div>
    );
};

export default ReservationDetails;

import React from 'react';
import './ReservationDetails.css';
import useReservationDetails from '../../../hooks/custom/useReservationDetails';

const ReservationDetails = ({ reservation }) => {
    const { society, infrastructure, loading, error } = useReservationDetails(reservation);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="reservation-details">
            <div className='detail'>
                <span className='label'>Society:</span>
                <span className="value">{society}</span>
            </div>
            <div className="detail">
                <span className="label">Email:</span>
                <span className="value">{reservation.idCustomer}</span>
            </div>
            <div className="detail">
                <span className="label">Infrastructure:</span>
                <span className="value">{infrastructure?.name}</span>
            </div>
            <div className="detail">
                <span className="label">Date:</span>
                <span className="value">{reservation.date}</span>
            </div>
            <div className="detail">
                <span className="label">Start Time:</span>
                <span className="value">{reservation.start}</span>
            </div>
            <div className="detail">
                <span className="label">End Time:</span>
                <span className="value">{reservation.end}</span>
            </div>
            <div className="detail">
                <span className="label">Infrastructure Type:</span>
                <span className="value">{reservation.infrastructureType}</span>
            </div>
            <div className="detail">
                <span className="label">Sub Date:</span>
                <span className="value">{reservation.subDate}</span>
            </div>
            <div className="detail">
                <span className="label">Sub Start Time:</span>
                <span className="value">{reservation.subStart}</span>
            </div>
            <div className="detail">
                <span className="label">Sub End Time:</span>
                <span className="value">{reservation.subEnd}</span>
            </div>
            <div className="detail">
                <span className="label">Number of Participants:</span>
                <span className="value">{reservation.nPartecipants}</span>
            </div>
            <div className="detail">
                <span className="label">Status:</span>
                <span className="value">{reservation.status}</span>
            </div>
            <div className="detail">
                <span className="label">HeadQuarter ID:</span>
                <span className="value">{reservation.idHeadQuarter}</span>
            </div>
        </div>
    );
};

export default ReservationDetails;

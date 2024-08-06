import React from "react";
import ReservationBox from "../ReservationBox/ReservationBox";

import "./ReservationList.css";

const ReservationList = ({ reservations, onReservationClicked }) => {
    return (
        <div className="reservation-list">
        {reservations.map((reservation) => (
            <ReservationBox
            key={reservation.id}
            reservation={reservation}
            onBoxClicked={(reservation) => onReservationClicked(reservation)}
            />
        ))}
        </div>
    );
};

export default ReservationList;
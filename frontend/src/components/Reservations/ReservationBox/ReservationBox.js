import React, { useEffect, useState } from 'react';
import './ReservationBox.css';
import useUser from '../../../hooks/useUser';

const ReservationBox = ({ reservation, onBoxClicked }) => {
  const { userData, loading, error } = useUser(reservation.idCustomer);
  const [society, setSociety] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (!loading && userData) {
      setSociety(userData.society);
      setName(userData.firstName + " " + userData.lastName);
    }
  }, [loading, userData]);

  const translateDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return '#f44336'; // Red
      case 1:
        return '#2196f3'; // Blue
      case 2:
        return '#ff9800'; // Orange
      case 3:
        return '#2196f3'; // Blue
      case 4:
        return '#4caf50'; // Green
      default:
        return '#000'; // Default to black if status is undefined
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="reservation-box" onClick={() => onBoxClicked(reservation)} style={{ borderLeftColor: getStatusColor(reservation.status) }}>
      <div className="reservation-content">
        <div className="reservation-info">
          <div className="society-info">{society}</div>
          <div className="user-name">{name}</div>
          <div className="status">
            {reservation.status === 0 && "Cancellata"}
            {reservation.status === 1 && "In attesa di approvazione"}
            {reservation.status === 2 && "In attesa di Comanda Bersagli"}
            {reservation.status === 3 && "Comanda caricata"}
            {reservation.status === 4 && "Confermata"}
          </div>
        </div>
        <div className="date">{translateDate(reservation.date)}</div>
      </div>
      <div className="reservation-arrow">›</div>
    </div>
  );
};

export default ReservationBox;

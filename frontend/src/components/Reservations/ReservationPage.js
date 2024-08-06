import React from 'react';
import ReservationDetails from './HelpBox/ReservationDetails';
import './ReservationPage.css';
import GeneralList from '../GeneralList/GeneralList';
import useReservationPage from '../../hooks/custom/useReservationPage';

const ReservationPage = () => {
  const { listElements, onReservationSelected, selectedReservation, loading, error } = useReservationPage();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mainContent">
      <div className="reservations-container">
        <GeneralList
          listElements={listElements}
          onElementClicked={onReservationSelected}
        />
      </div>
      <div className="reservation-details-container">
        {selectedReservation && <ReservationDetails reservation={selectedReservation} />}
      </div>
    </div>
  );
};

export default ReservationPage;

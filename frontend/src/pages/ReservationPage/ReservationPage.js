import React from 'react';
import ReservationDetails from '../../components/Reservations/HelpBox/ReservationDetails';
import './ReservationPage.css';
import GeneralList from '../../components/GeneralList/GeneralList';
import useReservationPage from '../../hooks/custom/useReservationPage';

const ReservationPage = () => {
  const { listElements, loading, error, onReservationSelected, selectedReservation } = useReservationPage();

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
      {
      <div className="reservation-details-container">
        {selectedReservation && <ReservationDetails reservation={selectedReservation} />}
      </div>
      }
    </div>
  );
};

export default ReservationPage;

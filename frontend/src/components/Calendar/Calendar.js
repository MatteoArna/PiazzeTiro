import React, { useEffect, useState } from 'react';
import './Calendar.css';
import { useAuth } from '../../hooks/useAuth';
import useBooking from '../../hooks/useBooking';
import useHeadquarter from '../../hooks/useHeadquarter';
import useInfrastructure from '../../hooks/useInfrastructure';
import useInfrastructureType from '../../hooks/useInfrastructureType';
import BookingModal from './BookingModal/BookingModal';

const Calendar = ({ userData }) => {
  const { auth } = useAuth();
  const { bookings, loading, error, loadBookings } = useBooking(auth.token);
  const { headquarters } = useHeadquarter(auth.token);
  const { infrastructureTypes } = useInfrastructureType(auth.token);
  const { infrastructures } = useInfrastructure(auth.token);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadBookings(userData.email);
  }, [loadBookings, userData.email]);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const closeBookingModal = () => {
    setSelectedBooking(null);
  };

  const searchHeadquarter = (id) => {
    const headquarter = headquarters.find((hq) => hq.id === id);
    return headquarter ? headquarter.name : 'Unknown Headquarter';
  };

  const searchInfrastructure = (id) => {
    const infrastructure = infrastructures.find((inf) => inf.id === id);
    return infrastructure ? infrastructure.name : 'Unknown Infrastructure';
  };

  const searchInfrastructureType = (id) => {
    const infrastructureType = infrastructureTypes.find((type) => type.id === id);
    return infrastructureType ? infrastructureType.type : 'Unknown Type';
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0: return 'booking-rejected';
      case 1: return 'booking-pending';
      case 2: return 'booking-awaiting-comanda';
      case 3: return 'booking-comanda-confirmed';
      case 4: return 'booking-confirmed';
      default: return '';
    }
  };

  const currentDate = new Date();

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', options).replace(/\//g, '.');
  };

  const filteredBookings = bookings.filter(
    (booking) => new Date(booking.date) >= currentDate
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="calendar">
      <h2>Il mio Calendario</h2>
      <div className="calendar-content">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className={`booking-item ${getStatusClass(booking.status)}`}
            onClick={() => handleBookingClick(booking)}
          >
            <p><b>{formatDate(booking.date)}</b></p>
            <p>{searchHeadquarter(booking.idHeadQuarter)}</p>
            <p>{booking.idInfrastructure ? searchInfrastructure(booking.idInfrastructure) : null}</p>
            <p>{searchInfrastructureType(booking.infrastructureType)}</p>
          </div>
        ))}
      </div>
      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={closeBookingModal}
          searchHeadquarter={searchHeadquarter}
          searchInfrastructure={searchInfrastructure}
          searchInfrastructureType={searchInfrastructureType}
        />
      )}
    </div>
  );
};

export default Calendar;

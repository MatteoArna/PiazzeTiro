import React from 'react';
import './Calendar.css';
import useCalendar from '../../hooks/custom/useCalendar';

const Calendar = ({ userData }) => {
  const {bookings, loading, error} = useCalendar(userData.email);

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
          >
            <p><b>{formatDate(booking.date)}</b></p>
            <p>{booking?.idHeadQuarter}</p>
            <p>{booking?.Infrastructure ? booking.Infrastructure?.name : booking.InfrastructureType.type}</p>
            <p>{booking?.InfrastructureType.HeadQuarter.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

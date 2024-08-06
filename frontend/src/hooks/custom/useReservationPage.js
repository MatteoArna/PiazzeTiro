import { useState, useEffect, useCallback } from "react";
import useBooking from "../useBooking";

const useReservationPage = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { bookings, loading, error } = useBooking();

  const [listElements, setListElements] = useState([]);

  const translateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }


  useEffect(() => {
    if (bookings.length > 0) {
      const elements = bookings.map((element) => ({
        id: element.id,
        title: element.User.society,
        subtitle: element.User.firstName + " " + element.User.lastName,
        description: element.HeadQuarter.name,
        more: translateDate(element.date),
      }));
      setListElements(elements);
    }
  }, [bookings]);

  const onReservationSelected = (reservationId) => {
    const reservation = bookings.find((element) => element.id === reservationId);
    setSelectedReservation(reservation);
  };

  return {
    listElements,
    onReservationSelected,
    selectedReservation,
    loading,
    error,
  };
};

export default useReservationPage;

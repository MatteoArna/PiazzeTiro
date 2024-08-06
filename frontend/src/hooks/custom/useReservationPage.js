import { useState, useEffect, useCallback } from "react";
import useBooking from "../useBooking";

const useReservationPage = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { bookings, loading, error } = useBooking();

  const [listElements, setListElements] = useState([]);

  useEffect(() => {
    if (bookings.length > 0) {
      const elements = bookings.map((element) => ({
        id: element.id,
        title: element.User.society,
        subtitle: element.User.firstName + " " + element.User.lastName,
        description: element.HeadQuarter.name,
        more: element.date,
      }));
      setListElements(elements);
    }
  }, [bookings]);

  const onReservationSelected = (reservation) => {
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

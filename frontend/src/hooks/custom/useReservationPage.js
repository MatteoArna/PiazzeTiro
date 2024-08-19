import { useState, useEffect, useCallback } from "react";
import useBooking from "../useBooking";

const useReservationPage = (user) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const { bookings, loading, error, deleteBooking, updateBooking } = useBooking();

  const [listElements, setListElements] = useState([]);

  const translateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }


  useEffect(() => {
    if (bookings.length > 0) {
      const elements = bookings.filter((element) => user.roleId === 'admin' || element.idCustomer === user.email).map((element) => ({
        id: element.id,
        title: user.roleId === 'admin' ? element.User.society : element.Infrastructure.name,
        subtitle: user.roleId === 'admin' ? element.User.firstName + " " + element.User.lastName : "Target: " + element.Target.name,
        description: element.InfrastructureType.HeadQuarter.name,
        more: translateDate(element.date),
        isRed: element.status === 0,
      }));
      setListElements(elements);
    }
  }, [bookings]);

  const onReservationSelected = (reservationId) => {
    const reservation = bookings.find((element) => element.id === reservationId);
    setSelectedReservation(reservation);
  };

  const handleDeleteBooking = (data) => {
    deleteBooking(data.id, data.motivation);
    //Find the interested element in the listElements list, set isRed to true and update the list of bookings, so that there is the motivation and the new state
    const element = listElements.find((element) => element.id === data.id);
    element.isRed = true;
    setListElements([...listElements]);

    bookings.forEach((element) => {
      if (element.id === data.id) {
        element.status = 0;
        element.motivation = data.motivation;
      }
    });

    setSelectedReservation(null);
  }

  const handleUpdateReservation = (data) => {
    updateBooking(data.id, data);
    //Find the interested element in the listElements list, set the new date and update the list of bookings
    const element = listElements.find((element) => element.id === data.id);
    element.more = translateDate(data.date);
    setListElements([...listElements]);

    bookings.forEach((element) => {
      if (element.id === data.id) {
        element.date = data.date;
        element.start = data.start;
        element.end = data.end;
      }
    });  
  }

  return {
    listElements,
    onReservationSelected,
    selectedReservation,
    loading,
    error,
    deleteReservation: handleDeleteBooking,
    updateReservation: handleUpdateReservation,
  };
};

export default useReservationPage;

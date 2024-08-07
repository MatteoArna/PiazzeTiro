import { useEffect } from "react";
import useBooking from "../useBooking";


const useCalendar = (userId) => {
    const {bookings, loading, error, loadBookingsById} = useBooking(false);

    console.log(bookings);

    useEffect(() => {
        loadBookingsById(userId);
    }, []);
        
    return {
        bookings,
        loading,
        error
    }
};

export default useCalendar;
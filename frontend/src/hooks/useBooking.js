import { useState, useEffect, useCallback } from 'react';
import { createBooking, fetchAllBookings, fetchBookingsByCustomer, deleteBooking, updateBooking } from '../services/bookingService';

const useBooking = (initialLoading = true) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadBookingsById = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await fetchBookingsByCustomer(id);
            setBookings(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);
        
    const loadAllBookings = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchAllBookings();
            setBookings(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(initialLoading)
            loadAllBookings();
    }, []);

    const checkData = (data) => {
        //check if data.date is in the past
        const date = new Date(data.date);
        const now = new Date();
        if(date < now)
            throw new Error("Date is in the past");

        //check if date.start is after date.end (the format is "14:00")
        const start = data.start.split(":");
        const end = data.end.split(":");
        if(start[0] > end[0] || (start[0] === end[0] && start[1] > end[1]))
            throw new Error("Start time is after end time");

        //Check if data.nPartecipants is more or equal to 1
        if(data.nPartecipants < 0 || data.nPartecipants > 25)
            throw new Error("Number of partecipants must be more or equal to 1 and less than 25");

    }

    const handleDeleteBooking = useCallback(async (id, motivation) => {
        try {
            setLoading(true);
            console.log("Motivation: " + motivation);
            await deleteBooking(id, motivation);
            //Add motivation to the booking and set the status to 0
            bookings.map((booking) => {
                if(booking.id === id) {
                    booking.status = 0;
                    booking.motivation = motivation;
                }
                return booking;
            });
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }, [loadAllBookings]);

    const handleUpdateBooking = useCallback(async (id, data) => {
        console.log("useBooking:", data);
        try {
            checkData(data);
            setLoading(true);
            await updateBooking(id, data);
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }, [loadAllBookings]);

    const handleCreateBooking = useCallback(async (data) => {
        try {
            checkData(data);
            setLoading(true);
            await createBooking(data);
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }, [loadAllBookings]);
   
    return {
        bookings,
        loading,
        error,
        loadBookingsById,
        createBooking: handleCreateBooking,
        deleteBooking: handleDeleteBooking,
        updateBooking: handleUpdateBooking
    };
}

export default useBooking;

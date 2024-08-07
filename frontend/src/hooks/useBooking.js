import { useState, useEffect, useCallback } from 'react';
import { createBooking, fetchAllBookings, fetchBookingsByCustomer } from '../services/bookingService';

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

    const handleCreateBooking = useCallback(async (data) => {
        try {
            console.log(data);
            setLoading(true);
            await createBooking(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [loadAllBookings]);
    /*
    const handleCreateBooking = useCallback(async (data) => {
        try {
            setLoading(true);
            const response = await createBookingService(token, data);
            setBookings(prevBookings => [...prevBookings, response.data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleUpdateBooking = useCallback(async (id, data) => {
        try {
            setLoading(true);
            await updateBookingService(token, id, data);
            setBookings(prevBookings => prevBookings.map(booking => {
                if (booking.id === id) {
                    return { ...booking, ...data };
                }
                return booking;
            }));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleDeleteBooking = useCallback(async (id) => {
        try {
            setLoading(true);
            await deleteBookingService(token, id);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [token]);
    */

    return {
        bookings,
        loading,
        error,
        loadBookingsById,
        createBooking: handleCreateBooking,
    };
}

export default useBooking;

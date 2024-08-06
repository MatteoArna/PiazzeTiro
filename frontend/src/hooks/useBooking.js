import { useState, useEffect, useCallback } from 'react';
import { fetchAllBookings } from '../services/bookingService';

const useBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        loadAllBookings();
    }, []);

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
        loadAllBookings,
    };
}

export default useBooking;

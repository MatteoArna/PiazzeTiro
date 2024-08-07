import api from './api';


export const fetchAllBookings = () => api.get('/bookings');
export const createBooking = (data) => api.post('/bookings', data);
export const fetchBookingsByCustomer = (customerId) => api.get(`/bookings/user/${customerId}`);
/*
export const fetchBookings = (token) => api.get('/bookings', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});*/

export const fetchBooking = (token, id) => api.get(`/bookings/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
/*
export const createBooking = (token, data) => api.post('/bookings', data, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
*/
export const updateBooking = (token, id, data) => api.put(`/bookings/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const deleteBooking = (token, id) => api.delete(`/bookings/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const fetchBookingsByInfrastructure = (token, infrastructureId) => api.get(`/bookings/infrastructure/${infrastructureId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const fetchBookingsByDate = (token, date) => api.get(`/bookings/date/${date}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

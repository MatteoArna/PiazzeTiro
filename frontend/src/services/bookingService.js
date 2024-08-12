import api from './api';


export const fetchAllBookings = () => api.get('/bookings');
export const createBooking = (data) => api.post('/bookings', data);
export const fetchBookingsByCustomer = (customerId) => api.get(`/bookings/user/${customerId}`);
export const deleteBooking = (id, motivation) => api.delete(`/bookings/${id}`, {data: {motivation}});
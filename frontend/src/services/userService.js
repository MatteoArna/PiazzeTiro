import api from './api';

export const fetchUserData = (email) => api.get(`/users/${email}`);
export const fetchAllUsers = (token) => api.get('/users', { headers: { Authorization: `Bearer ${token}` } });

export const updateUserStatus = (email, data) => api.put(`/users/${email}`, data);

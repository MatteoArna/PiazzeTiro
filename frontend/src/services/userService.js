import api from './api';

export const fetchUserData = (email) => api.get(`/users/${email}`);
export const updateUser = (email, userData) => api.put(`/users/${email}`, userData);

import api from './api';

export const fetchUserById = (email) => api.get(`/users/${email}`);
export const fetchAllUsers = () => api.get('/users');
export const fetchUserRoleById = (roleId) => api.get(`/user_roles/${roleId}`);

export const setUserToNextStatus = (email) => api.put(`/users/nextStatus/${email}`);

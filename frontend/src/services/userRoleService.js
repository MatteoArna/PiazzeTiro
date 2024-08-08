import api from './api';

export const fetchAllRoles = () => api.get('/user_roles');
import api from './api';

export const fetchHeadquarters = (token) => api.get('/headquarters', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const updateHeadquarter = (token, id, data) => api.put(`/headquarters/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

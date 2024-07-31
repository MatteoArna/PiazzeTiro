import api from './api';

export const fetchHeadquarters = (token) => api.get('/headquarters', {
    headers:
    {
        Authorization: `Bearer ${token}`
    }
});


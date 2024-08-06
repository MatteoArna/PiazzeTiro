import api from './api';


export const fetchHeadquarters = () => api.get('/headquarters');

export const updateHeadquarter = (token, id, data) => api.put(`/headquarters/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

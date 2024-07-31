import api from './api';

export const fetchInfrastructures = (token) => api.get('/infrastructures', {
    headers:
    {
        Authorization: `Bearer ${token}`
    }
});

export const createInfrastructure = (token, infrastructureData) => api.post('/infrastructures/create', infrastructureData, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
});

export const updateInfrastructure = (token, id, infrastructureData) => api.put(`/infrastructures/update/${id}`, infrastructureData, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
});

export const deleteInfrastructure = (token, id) => api.delete(`/infrastructures/${id}`, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
});
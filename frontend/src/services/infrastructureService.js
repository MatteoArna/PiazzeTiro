import api from './api';

export const fetchInfrastructures = (token) => api.get('/infrastructures', {
    headers:
    {
        Authorization: `Bearer ${token}`
    }
});

export const createInfrastructure = (token, infrastructureData) => api.post('/infrastructures', infrastructureData, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export const updateInfrastructure = (token, id, infrastructureData) => api.put(`/infrastructures/${id}`, infrastructureData, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export const deleteInfrastructure = (token, id) => api.delete(`/infrastructures/${id}`, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

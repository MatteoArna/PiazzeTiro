import api from './api';

export const fetchInfrastructureTypes = () => api.get('/infrastructureTypes');

export const createInfrastructureType = (token, infrastructureTypeData) => api.post('/infrastructureTypes', infrastructureTypeData, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export const updateInfrastructureType = (token, id, infrastructureTypeData) => api.put(`/infrastructureTypes/${id}`, infrastructureTypeData, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export const deleteInfrastructureType = (token, id) => api.delete(`/infrastructureTypes/${id}`, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
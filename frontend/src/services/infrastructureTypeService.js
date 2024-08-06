import api from './api';

export const fetchInfrastructureTypes = () => api.get('/infrastructureTypes');
export const fetchInfrastructureType = (id) => api.get(`/infrastructureTypes/${id}`);
export const createInfrastructureType = (infrastructureTypeData) => api.post('/infrastructureTypes', infrastructureTypeData);
export const updateInfrastructureType = (id, infrastructureTypeData) => api.put(`/infrastructureTypes/${id}`, infrastructureTypeData);
export const fetchInfrastructuresByType = (id) => api.get(`/infrastructureTypes/${id}/infrastructures`);

export const deleteInfrastructureType = (token, id) => api.delete(`/infrastructureTypes/${id}`, {
    headers:
    {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
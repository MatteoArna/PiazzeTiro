import api from './api';

export const fetchInfrastructureById = (id) => api.get(`/infrastructures/${id}`);
export const fetchInfrastructures = () => api.get('/infrastructures');
export const createInfrastructure = (infrastructureData) => api.post('/infrastructures', infrastructureData, {
    headers: {
        'Content-Type': 'application/json'
    }
});
export const updateInfrastructure = (id, infrastructureData) => api.put(`/infrastructures/${id}`, infrastructureData, {
    headers: {
        'Content-Type': 'application/json'
    }
});
export const deleteInfrastructure = (id) => api.delete(`/infrastructures/${id}`, {
    headers: {
        'Content-Type': 'application/json'
    }
});

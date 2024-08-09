import api from './api';


export const fetchHeadquarters = () => api.get('/headquarters');
export const createHeadquarter = (data) => api.post('/headquarters', data);

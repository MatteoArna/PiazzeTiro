import api from './api';

/*export const fetchPages = () => api.get('/pages', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});*/

export const fetchAllPages = () => api.get('/pages');
export const fetchPageTypes = () => api.get('/pageTypes');
export const createPage = (pageData) => api.post('/pages/create', pageData);
export const updatePage = (id, pageData) => api.put(`/pages/update/${id}`, pageData);
export const deletePage = (id) => api.delete(`/pages/${id}`);

/*
export const fetchPageTypes = (token) => api.get('/pageTypes', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const createPage = (token, pageData) => api.post('/pages/create', pageData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});
export const updatePage = (token, id, pageData) => api.put(`/pages/update/${id}`, pageData, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  },
});

export const deletePage = (token, id) => api.delete(`/pages/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  },
});*/

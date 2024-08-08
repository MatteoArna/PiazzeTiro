import api from './api';

export const fetchDocumentsByUser = (userId) => api.get(`/documents/user/${userId}`);
export const uploadDocument = (documentData) => api.post('/documents/create', documentData);
export const deleteDocument = (documentId) => api.delete(`/documents/${documentId}`);
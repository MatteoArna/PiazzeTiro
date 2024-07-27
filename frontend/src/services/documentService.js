import api from './api';

export const uploadDocument = (token, documentData) => api.post('/documents/create', documentData, {
    headers:
    {
        Authorization: `Bearer ${token}`,
    },
});

export const fetchDocumentsByUser = (token, userId) => api.get(`/documents/user/${userId}`, {
    headers:
    {
        Authorization: `Bearer ${token}`,
    },
});

export const deleteDocument = (token, documentId) => api.delete(`/documents/${documentId}`, {
    headers:
    {
        Authorization: `Bearer ${token}`,
    },
});

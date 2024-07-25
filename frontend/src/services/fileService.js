import api from './api';

export const fetchFile = async (filePath) => {
  const response = await api.get(`/uploads/${filePath.split('/').pop()}`, {
    responseType: 'blob',
  });

  return response.data;
};

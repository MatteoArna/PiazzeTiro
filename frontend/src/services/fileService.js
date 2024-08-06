import { getAuthToken } from './authService';

export const fetchFile = async (filename) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${filename}`, {

      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url;
  } catch (error) {
    throw new Error('Error fetching file:', error);
  }
};

export const uploadFile = async (fileData) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/uploads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: fileData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error uploading file:', error);
  }
};

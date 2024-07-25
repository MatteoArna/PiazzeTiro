import axios from 'axios';
import { getAuthToken } from './authService'; // Funzione per ottenere il token di autenticazione

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor per aggiungere il token di autenticazione a tutte le richieste
api.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor per gestire gli errori
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Gestisci errori di autenticazione
    }
    return Promise.reject(error);
  }
);

export default api;

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const isAdmin = (user) => {
  return user && user.role === 1;
}



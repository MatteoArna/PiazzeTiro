export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const getUserEmail = () => {
    return localStorage.getItem('email');
  };
  
  export const login = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };
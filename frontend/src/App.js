// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/homepage"
              element={
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRoleId={1}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

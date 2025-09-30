import React, { createContext, useState, useContext, useEffect } from 'react';
import { postChat, fetchMemories } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetchMemories('/auth/me');
        setCurrentUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        console.error('Authentication error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await postChat('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await postChat('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

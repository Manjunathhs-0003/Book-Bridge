import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthenticated = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/profile', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading animation
  }

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
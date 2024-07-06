import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout'; // Import Layout
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Wrap the page components inside Layout except for HomePage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
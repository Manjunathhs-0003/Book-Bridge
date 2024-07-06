import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';  // Assuming NavBar is directly under components folder

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      {children}
    </div>
  );
};

export default Layout;
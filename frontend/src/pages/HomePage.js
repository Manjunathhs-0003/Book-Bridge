import React from 'react';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <h1>Welcome to Book Swapping Platform</h1>
      <p>Please login or register to start trading books.</p>
    </div>
  );
};

export default HomePage;
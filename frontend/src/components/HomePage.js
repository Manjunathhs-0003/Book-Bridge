import React from 'react';
import GradientBackground from '../components/GradientBackground';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <GradientBackground>
        <h1>Welcome to Book Swapping</h1>
        {/* Other content for the home page */}
      </GradientBackground>
    </div>
  );
};

export default HomePage;

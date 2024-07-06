import React from 'react';
import { HeroHighlight } from '../components/ui/hero-highlight';

const HomePage = () => (
  <div className="min-h-screen bg-black text-white">
    <HeroHighlight>
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl font-bold mt-12">Trade Books Effortlessly</h1>
        <p className="text-lg mt-4">
          Welcome to our Book Trading Platform, where you can easily swap books with a community of avid readers.
          Discover new titles, share your favorite books, and enjoy the numerous benefits of book swapping.
        </p>
      </div>
    </HeroHighlight>
  </div>
);

export default HomePage;
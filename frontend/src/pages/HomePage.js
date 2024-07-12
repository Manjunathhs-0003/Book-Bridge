import React from 'react';
import { Link } from 'react-router-dom';
import { HeroHighlight } from '../components/ui/hero-highlight';

const HomePage = () => (
  <div className="min-h-screen bg-black text-white">
    <HeroHighlight>
      <div className="relative z-20 text-center px-4">
        <h1 className="text-9xl font-bold mt-5 mb-10 yatra-one-regular">Book Bridge</h1>
        <h2 className="text-4xl font-bold mt-2 mb-10">Trade Books Effortlessly</h2>
        <p className="text-lg mt-4 mb-8">
          Welcome to our Book Trading Platform <br /> where you can easily swap books with a community of avid readers.
          Discover new titles, share your favorite books, and enjoy the numerous benefits of book swapping.
        </p>
        <div className="flex justify-center space-x-5 mt-15">
          <Link to="/login" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-sm font-medium text-white backdrop-blur-3xl yatra-one-regular">
              Login
            </span>
          </Link>
          <Link to="/register" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl yatra-one-regular">
              Register
            </span>
          </Link>
        </div>
      </div>
    </HeroHighlight>
  </div>
);

export default HomePage;

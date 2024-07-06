import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { HeroHighlight } from '../components/ui/hero-highlight';
import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <HeroHighlight>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mt-12"
        >
          Explore the world of books and trading.
        </motion.h1>
      </HeroHighlight>
      <div className="container mx-auto px-4 py-10">
        <section className="mt-10">
          <h2 className="text-3xl font-bold">About the Platform</h2>
          <p className="text-lg mt-4">
            Our book swapping platform allows you to easily trade your books with others. 
            Engage in a community of book lovers and discover new reads without spending a dime.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-lg mt-4">
            1. Register and log in to start swapping.<br />
            2. List the books you want to exchange.<br />
            3. Browse books listed by other users.<br />
            4. Contact users and arrange the swap!
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-3xl font-bold">Popular Books</h2>
          <p className="text-lg mt-4">
            Check out some of the most popular books being swapped on our platform. 
            Find your next great read today!
          </p>
          {/* Add popular books list here */}
        </section>
        {!user && (
          <div className="flex justify-center space-x-4 mt-10">
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded text-white">Login</Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded text-white">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
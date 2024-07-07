import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { FloatingNav } from './ui/floating-navbar'; // Using your existing FloatingNav component
import { IconHome, IconUser, IconMessage } from '@tabler/icons-react';

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <nav className="absolute top-16 w-full">
        <ul className="flex justify-center space-x-4 bg-black p-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
              <li><Link to="/profile" className="text-white">Profile</Link></li>
              <li><button onClick={handleLogout} className="text-white">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="text-white">Login</Link></li>
              <li><Link to="/register" className="text-white">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
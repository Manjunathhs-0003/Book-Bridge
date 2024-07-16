import React, { useContext } from "react";
import { FloatingNav } from "./ui/floating-navbar"; // Make sure this path is correct
import { IconHome, IconUser } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from 'axios';

const NavBar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 yatra-one-regular dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconHome className="h-4 w-4 text-neutral-500 yatra-one-regular dark:text-white" />,
    },
    ...(user ? [
      {
        name: "Profile",
        link: "/profile",
        icon: <IconUser className="h-4 w-4 text-neutral-500 yatra-one-regular dark:text-white" />,
      },
    ] : [])
  ];

  // Exclude the FloatingNav on Home Page
  if (location.pathname === "/home" || location.pathname === "/") {
    return null;
  }

  return (
    <div className="relative w-full">
      <FloatingNav 
        navItems={navItems} 
        user={user} 
        onLogout={handleLogout} 
      />
    </div>
  );
};

export default NavBar;

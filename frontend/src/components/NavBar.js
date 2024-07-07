import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconUser } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  // Exclude the FloatingNav on Home Page
  if (location.pathname === "/home" || location.pathname === "/") {
    return null;
  }

  return <FloatingNav navItems={navItems} />;
};

export default NavBar;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { HeroHighlight } from "../components/ui/hero-highlight";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />
      <HeroHighlight>
        {/* Assuming HeroHighlight has a background image or color */}
        <div className="container mx-auto p-4 text-center flex flex-col items-center justify-center flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-4xl text-center mt-12"
          >
            Explore the world of books and trading.
          </motion.h1>
          <InfoSection />
        </div>
      </HeroHighlight>
    </div>
  );
};

const InfoSection = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-wrap justify-center space-x-5">
        <CardContainer className="inter-var">
          <CardBody className="bg-transparent relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-white"
            >
              About the Platform
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-white text-sm max-w-sm mt-2"
            >
              Our book swapping platform allows you to easily trade your books
              with others. Engage in a community of book lovers and discover new
              reads without spending a dime.
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4"></CardItem>
          </CardBody>
        </CardContainer>

        <CardContainer className="inter-var">
          <CardBody className="bg-transparent relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-white"
            >
              How It Works
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-white text-sm max-w-sm mt-2"
            >
              <ul className="text-lg list-disc mt-4">
                <li>Register and log in to start swapping.</li>
                <li>List the books you want to exchange.</li>
                <li>Browse books listed by other users.</li>
                <li>Contact users and arrange the swap!</li>
              </ul>
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4"></CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default Dashboard;

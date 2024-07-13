import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { BookCard } from "../components/ui/book-card";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/books")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroHighlight>
        <div className="container mx-auto p-4 text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-4xl text-center mt-12 yatra-one-regular"
          >
            Explore the world of books and trading.
          </motion.h1>
          <InfoSection />
          <BooksSection books={books} />
        </div>
      </HeroHighlight>
    </div>
  );
};

const InfoSection = () => {
  return (
    <div className="my-16 flex flex-col items-center justify-center space-y-8 relative z-10">
      <div className="flex flex-wrap justify-center gap-8">
        <CardContainer className="inter-var">
          <CardBody className="bg-transparent relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="100" className="text-xl font-bold text-white yatra-one-regular">
              About the Platform
            </CardItem>
            <CardItem translateZ="60" className="text-lg mt-4 yatra-one-regular">
              Our book swapping platform allows you to easily trade your books with others. Engage in a community of book lovers and discover new reads without spending a dime.
            </CardItem>
          </CardBody>
        </CardContainer>

        <CardContainer className="inter-var">
          <CardBody className="bg-transparent relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="100" className="text-xl font-bold text-white yatra-one-regular">
              How It Works
            </CardItem>
            <CardItem translateZ="60" className="text-sm max-w-sm mt-2">
              <div className="text-lg list-disc mt-4 yatra-one-regular">
                <ul>
                  <li>Register and log in to start swapping.</li>
                  <li>List the books you want to exchange.</li>
                  <li>Browse books listed by other users.</li>
                  <li>Contact users and arrange the swap!</li>
                </ul>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

const BooksSection = ({ books }) => {
  return (
    <div className="mt-16 relative z-10">
      <h2 className="text-3xl font-bold mb-8 yatra-one-regular">Books Available for Trading</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure Routes is imported correctly
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import AddBookPage from './pages/AddBookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookListPage from './pages/BookListPage';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book-list" element={<BookListPage />} />
      </Routes>
    </Router>
  );
};

export default App;

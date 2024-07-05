import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddBookPage from './pages/AddBookPage';
import BooksPage from './pages/BooksPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </Router>
  );
};

export default App;
import React from 'react';
import NavBar from '../components/NavBar';
import Herohighlight from '../components/Herohighlight';

const BooksPage = () => {
  return (
    <div>
      <NavBar />
      <Herohighlight>
        <h2>Explore Our Books</h2>
        {/* Display books or other content */}
      </Herohighlight>
      {/* Other content for the books page */}
    </div>
  );
};

export default BooksPage;

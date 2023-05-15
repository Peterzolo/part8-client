import React from "react";

import BookList from "./components/book/BookList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>
      </Router>
      <BookList />
    </div>
  );
};

export default App;

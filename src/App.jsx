import React from "react";

import BookList from "./components/book/BookList";
import BookDetails from "./components/book/BookDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu/Menu";
import AuthorList from "./components/authors/AuthorList";
import AuthorDetails from "./components/authors/AuthorDetails";

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/:id" element={<BookDetails />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/author/:id" element={<AuthorDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

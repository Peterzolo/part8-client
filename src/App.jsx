import React from "react";

import BookList from "./components/book/BookList";
import BookDetails from "./components/book/BookDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu/Menu";
import AuthorList from "./components/authors/AuthorList";
import AuthorDetails from "./components/authors/AuthorDetails";
import AddBook from "./components/book/AddBook";
import EditAuthor from "./components/authors/EditAuthor";
import CreateAuthor from "./components/authors/CreateAuthor";
import LoginAuthor from "./components/authors/LoginAuthor";

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/:id" element={<BookDetails />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/author/:id" element={<AuthorDetails />} />
        <Route path="/book/add" element={<AddBook />} />
        <Route path="/author/edit/:id" element={<EditAuthor />} />
        <Route path="/author/add" element={<CreateAuthor />} />
        <Route path="/author/login" element={<LoginAuthor />} />
      </Routes>
    </Router>
  );
};

export default App;

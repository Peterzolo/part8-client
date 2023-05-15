import React from "react";

import BookList from "./components/book/BookList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu/Menu";

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
};

export default App;

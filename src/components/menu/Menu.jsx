import React from "react";

import "../menu/Menu.css";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="main-menu-wrapper">
      <ul className="menu-wrap">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <li className="menu-item">Books</li>
        </Link>
        <Link to={"/authors"} style={{ textDecoration: "none" }}>
          <li className="menu-item">Authors</li>
        </Link>
        <Link to={"/book/add"} style={{ textDecoration: "none" }}>
          <li className="menu-item">Add Book</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;

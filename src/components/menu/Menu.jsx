import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../menu/Menu.css";

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in based on the presence of a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if a token exists, false otherwise
  }, []); // Run this effect only once when the component mounts

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("author-name");
    setIsLoggedIn(false);
    navigate("/");
  };

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
        <Link to={"/author/add"} style={{ textDecoration: "none" }}>
          <li className="menu-item">Add Author</li>
        </Link>

        {isLoggedIn ? (
          <li className="menu-item" onClick={handleLogout}>
            Logout
          </li>
        ) : (
          <Link to={"/author/login"} style={{ textDecoration: "none" }}>
            <li className="menu-item">Login</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Menu;

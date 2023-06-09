import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../menu/Menu.css";

const Menu = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("author-name"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("author-name");
    setUser("");
    navigate("/");
  };

  return (
    <div className="container">
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
        <Link to={"/book/search"} style={{ textDecoration: "none" }}>
          <li className="menu-item">Search Books</li>
        </Link>

        {user ? (
          <li className="menu-item-logout" onClick={handleLogout}>
            Logout
          </li>
        ) : (
          <Link to={"/author/login"} style={{ textDecoration: "none" }}>
            <li className="menu-item-login">Login</li>
          </Link>
        )}
        {user && (
          <li className="menu-item-user">You are logged in as: {user}</li>
        )}
      </ul>
    </div>
  );
};

export default Menu;

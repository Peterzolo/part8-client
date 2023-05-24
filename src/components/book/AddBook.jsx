import React, { useEffect, useState } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../notification/Notification";

const ADD_BOOK = gql`
  mutation addBook($bookInput: BookInput!) {
    addBook(bookInput: $bookInput) {
      title
      published
      genre
    }
  }
`;

const NEW_BOOK_SUBSCRIPTION = gql`
  subscription {
    newBook {
      title
      published
      genre
    }
  }
`;

const AddBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const [addBook] = useMutation(ADD_BOOK);

  const { data: newBookData } = useSubscription(NEW_BOOK_SUBSCRIPTION);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (newBookData && newBookData.newBook) {
      console.log(newBookData);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  }, [newBookData]);

  const handleAddBook = (event) => {
    event.preventDefault();

    addBook({
      variables: {
        bookInput: {
          title: title,
          published: parseInt(published),
          genre: genre.toString(),
        },
      },
    })
      .then(() => {
        setTitle("");
        setPublished("");
        setGenre("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="notification">
        {showNotification && <Notification message="New book added!" />}{" "}
      </div>
      {isLoggedIn ? (
        <form onSubmit={handleAddBook} className="form-wrap">
          <div className="add-book-title">Add Book</div>
          <div className="input-wrap">
            <label>Title:</label>
            <input
              className="form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Published:</label>
            <input
              className="form-input"
              type="number"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Genre:</label>
            <input
              className="form-input"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <button className="add-btn" type="submit">
            Add Book
          </button>
        </form>
      ) : (
        <div className="login-to-add">
          <Link
            to={"/author/login"}
            style={{ textDecoration: "none", color: "white", fontSize: "18px" }}
          >
            Login To Add
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddBook;

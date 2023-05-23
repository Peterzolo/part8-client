import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const ADD_BOOK = gql`
  mutation addBook($bookInput: BookInput!) {
    addBook(bookInput: $bookInput) {
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

  const [addBook] = useMutation(ADD_BOOK);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

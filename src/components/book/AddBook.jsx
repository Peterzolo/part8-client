import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: ID!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      book: {
        title: $title
        author: $author
        published: $published
        genres: $genres
      }
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

const AddBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  const handleAddBook = (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres: genres.map((genre) => genre.trim()), // Trim whitespace from genres
      },
    })
      .then(() => {
        setTitle("");
        setAuthor("");
        setPublished("");
        setGenres([]);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook} className="form-wrap">
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
          <label>Author:</label>
          <input
            className="form-input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
          <label>Genres:</label>
          <input
            className="form-input"
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value.split(","))}
          />
        </div>
        <button className="add-btn" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;

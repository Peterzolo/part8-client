import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

const ADD_BOOK = gql`
  mutation createPerson(
    $title: String!
    $author: String!
    $genre: String!
    $published: String
  ) {
    addPerson(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`;

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  const handleAddBook = (event) => {
    event.preventDefault();

    addBook({
      variables: { title, author, published: parseInt(published), genres },
    });
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Published:</label>
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>
        <div>
          <label>Genres:</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value.split(","))}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

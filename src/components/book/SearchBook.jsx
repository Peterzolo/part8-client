import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import "../book/BookList.css";

const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    getBooksByGenre(genre: $genre) {
      title
      published
      genre
      id
      author {
        name
        born
      }
    }
  }
`;

const genres = ["Programming", "Music", "Business", "Educational"];

const SearchBook = () => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const { loading, error, data } = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data?.getBooksByGenre;

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="container">
      <h2 className="book-list-title">Search Results</h2>
      <div className="genre-buttons-wrap">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className="genre-button"
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="book-hero">
        {books && books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="search-wrap">
              <h5 className="search-book-title">{book.title}</h5>
              <p>Author: {book.author?.name}</p>
              <p>Published: {book.published}</p>
              <p>Genre: {book.genre}</p>
            </div>
          ))
        ) : (
          <p>No books found for the selected genre.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBook;

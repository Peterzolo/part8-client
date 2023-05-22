import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BOOKS_BY_GENRE } from "./yourGraphQLQueries"; // Replace with your actual GraphQL query

const SearchBook = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [getBooksByGenre, { loading, data }] = useLazyQuery(GET_BOOKS_BY_GENRE);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  useEffect(() => {
    if (selectedGenre !== "") {
      getBooksByGenre({ variables: { genre: selectedGenre } });
    }
  }, [selectedGenre, getBooksByGenre]);

  return (
    <div>
      <h2>Search Books</h2>
      <div>
        <button onClick={() => handleGenreClick("")}>All Genres</button>
        <button onClick={() => handleGenreClick("Fantasy")}>Fantasy</button>
        <button onClick={() => handleGenreClick("Sci-Fi")}>Sci-Fi</button>
        {/* Add more genre buttons as needed */}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data && data.getBooksByGenre ? (
            data.getBooksByGenre.map((book) => (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author.name}</p>
                <p>Published: {book.published}</p>
                <p>Genre: {book.genre}</p>
              </div>
            ))
          ) : (
            <p>No books found for the selected genre.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBook;

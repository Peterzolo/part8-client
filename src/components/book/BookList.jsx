import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "../book/BookList.css";
import { useNavigate } from "react-router-dom";

const ALL_BOOKS = gql`
  query GetAllBooks($genre: String) {
    getAllBooks(filter: { genre: $genre }) {
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

const BookList = () => {
  const [genreFilter, setGenreFilter] = useState("");
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS);
  console.log("DATA", data);
  const navigate = useNavigate();
  const books = data?.getAllBooks || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFilterChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    refetch({ genre: genreFilter });
  };

  return (
    <div className="container">
      <form onSubmit={handleFilterSubmit}>
        <input
          type="text"
          placeholder="Filter by genre"
          value={genreFilter}
          onChange={handleFilterChange}
        />
        <button type="submit">Filter</button>
      </form>
      <h2 className="book-list-title">Book List</h2>
      <div className="book-hero">
        {books.map((book) => (
          <div key={book.id} className="book-wrap">
            <div className="all-wrap">
              <h5>Title</h5>
              <div className="" onClick={() => navigate(`/${book.id}`)}>
                {book.title}
              </div>
            </div>
            <div className="all-wrap">
              <h5>Published</h5>
              <div>{book.published}</div>
            </div>
            <div className="all-wrap">
              <h5>Genre</h5>
              <div>{book.genre}</div>
            </div>
            <div className="all-wrap">
              <h5>Author</h5>
              <div>{book.author.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;

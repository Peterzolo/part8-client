import React from "react";
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
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const navigate = useNavigate();
  const books = data?.getAllBooks;
  console.log("BOOKS", books);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2 className="book-list-title">Book List</h2>
      <div className="book-hero">
        {books &&
          books?.map((book) => (
            <div key={book.id} className="book-wrap">
              <div className="all-wrap">
                <h5>books</h5>
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

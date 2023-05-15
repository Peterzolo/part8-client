import React from "react";
import { gql, useQuery } from "@apollo/client";

import "../book/BookList.css";
import { useNavigate } from "react-router-dom";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const navigate = useNavigate();

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
        {data.allBooks &&
          data.allBooks.map((book) => (
            <div key={book.id} className="book-wrap">
              <div className="book" onClick={() => navigate(`/${book.id}`)}>
                {book.title}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookList;

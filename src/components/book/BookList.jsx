import React from "react";
import BookDetails from "./BookDetails";
import { gql, useQuery } from "@apollo/client";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Book List</h2>

      <div>
        {data.allBooks &&
          data.allBooks.map((book) => (
            <div key={book.id}>
              <BookDetails book={book} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookList;

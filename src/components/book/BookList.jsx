import React from "react";
import BookDetails from "./BookDetails";

const BookList = ({ data, error, loading }) => {
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

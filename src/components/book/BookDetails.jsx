import React from "react";

const BookDetails = ({ book }) => {
  return (
    <div>
      <h2>Book Details</h2>
      <div>{book.title}</div>
    </div>
  );
};

export default BookDetails;

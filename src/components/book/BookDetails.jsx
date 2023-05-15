import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_BOOK_DETAILS = gql`
  query findBookQuery($findBookId: String!) {
    findBook(id: $findBookId) {
      title
      author
      genres
      published
      id
    }
  }
`;

const BookDetails = () => {
  const { id } = useParams(); // Retrieve the book ID from the URL parameters
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { findBookId: id }, // Pass the variable with its value
  });

  console.log("DATA", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const book = data.findBook;

  return (
    <div className="container">
      <div className="wrap">
        <h3>Title :</h3>
        <h4>{book.title}</h4>
      </div>
      <div className="wrap">
        <h3>Genre :</h3>
        <h4>{book.genres}</h4>
      </div>
      <div className="wrap">
        <h3>Author :</h3>
        <h4>{book.author}</h4>
      </div>
      <div className="wrap">
        <h3>Year :</h3>
        <h4>{book.published}</h4>
      </div>
    </div>
  );
};

export default BookDetails;

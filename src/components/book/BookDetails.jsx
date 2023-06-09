import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_BOOK_DETAILS = gql`
  query getBook($id: ID!) {
    getBook(id: $id) {
      title
      author {
        name
      }
      genre
      published
      id
    }
  }
`;

const BookDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const book = data.getBook;

  return (
    <div className="container">
      <div className="wrap">
        <h3>Title :</h3>
        <h4>{book.title}</h4>
      </div>
      <div className="wrap">
        <h3>Genre :</h3>
        <h4>{book.genre}</h4>
      </div>
      <div className="wrap">
        <h3>Author :</h3>
        <h4>{book.author.name}</h4>
      </div>
      <div className="wrap">
        <h3>Year :</h3>
        <h4>{book.published}</h4>
      </div>
    </div>
  );
};

export default BookDetails;

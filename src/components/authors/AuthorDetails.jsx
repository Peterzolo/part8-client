import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_BOOK_DETAILS = gql`
  query findAuthorQuery($findAuthorId: String!) {
    findAuthor(id: $findAuthorId) {
      name
      born
      bookCount
      id
    }
  }
`;

const AuthorDetails = () => {
  const { id } = useParams(); // Retrieve the book ID from the URL parameters
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { findAuthorId: id }, // Pass the variable with its value
  });

  console.log("DATA", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const author = data.findBook;

  return (
    <div className="container">
      <div className="wrap">
        <h3>Name :</h3>
        <h4>{author.name}</h4>
      </div>
      <div className="wrap">
        <h3>Genre :</h3>
        <h4>{author.born}</h4>
      </div>
      <div className="wrap">
        <h3>Number Of Books :</h3>
        <h4>{author.bookCount}</h4>
      </div>
    </div>
  );
};

export default AuthorDetails;

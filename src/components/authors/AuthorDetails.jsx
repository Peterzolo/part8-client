import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_AUTHOR_DETAILS = gql`
  query FindAuthor($findAuthorId: String!) {
    findAuthor(id: $findAuthorId) {
      name
      born
    }
  }
`;

const UPDATE_AUTHOR_BORN_YEAR = gql`
  mutation EditAuthor($authorId: ID!, $born: Int!) {
    editAuthor(id: $authorId, born: $born) {
      id
      born
    }
  }
`;

const AuthorDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_AUTHOR_DETAILS, {
    variables: { findAuthorId: id },
  });
  const [updateAuthorBornYear] = useMutation(UPDATE_AUTHOR_BORN_YEAR);
  const [bornYear, setBornYear] = useState("");

  const handleUpdateBornYear = (event) => {
    event.preventDefault();
    updateAuthorBornYear({
      variables: { authorId: id, born: parseInt(bornYear) },
      refetchQueries: [
        { query: GET_AUTHOR_DETAILS, variables: { findAuthorId: id } },
      ],
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const author = data.findAuthor;

  return (
    <div className="container">
      <div className="wrap">
        <h3>Name:</h3>
        <h4>{author.name}</h4>
      </div>
      <div className="wrap">
        <h3>Born:</h3>
        <h4>{author.born}</h4>
      </div>
      <div className="wrap">
        <h3>Number Of Books:</h3>
        <h4>{author.bookCount}</h4>
      </div>
      <hr />
      <form onSubmit={handleUpdateBornYear}>
        <div className="wrap">
          <h3>Update Born Year:</h3>
          <input
            type="number"
            value={bornYear}
            onChange={(e) => setBornYear(e.target.value)}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default AuthorDetails;

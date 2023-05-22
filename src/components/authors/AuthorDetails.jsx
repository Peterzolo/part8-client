import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_AUTHOR_DETAILS = gql`
  query getAuthor($findAuthorId: ID!) {
    getAuthor(id: $findAuthorId) {
      id
      name
      born
      bookCount
    }
  }
`;

const UPDATE_AUTHOR_BORN_YEAR = gql`
  mutation updateAuthorBornYear($id: ID!, $authorInput: AuthorInput!) {
    updateAuthor(id: $id, authorInput: $authorInput) {
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
      variables: {
        id: id,
        authorInput: { born: parseInt(bornYear) },
      },
      refetchQueries: [
        { query: GET_AUTHOR_DETAILS, variables: { findAuthorId: id } },
      ],
    })
      .then(() => {
        setBornYear("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const author = data.getAuthor;

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
            className="update-input"
            type="number"
            value={bornYear}
            onChange={(e) => setBornYear(e.target.value)}
          />
        </div>
        <button className="update-btn" type="submit">
          Update author
        </button>
      </form>
    </div>
  );
};

export default AuthorDetails;

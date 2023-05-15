import React from "react";
import "../authors/Author.css";

import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const AuthorList = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  console.log("DATA", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2 className="author-list-title">author List</h2>
      <div className="author-hero">
        {data.allAuthors &&
          data.allAuthors.map((author) => (
            <div key={author.id} className="author-wrap">
              <div className="author">{author.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthorList;

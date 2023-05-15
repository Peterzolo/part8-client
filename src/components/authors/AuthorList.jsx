import React from "react";
import "../authors/Author.css";

import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
              <div className="all-wrap">
                <h5>Authors</h5>
                <div
                  className=""
                  onClick={() => navigate(`/author/${author.id}`)}
                >
                  {author.name}
                </div>
              </div>

              <div className="all-wrap">
                <h5>Born</h5>
                <div>{author.name}</div>
              </div>
              <div className="all-wrap">
                <h5>Books</h5>
                <div>{author.bookCount}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthorList;

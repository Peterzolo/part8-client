import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import "../authors/Author.css";

const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    getAllAuthors {
      name
      born
      bookCount
      books {
        title
        published
        genre
      }
    }
  }
`;
const AuthorList = () => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);
  const navigate = useNavigate();

  console.log("ALL AUTHORS", data);

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
        {data.getAllAuthors &&
          data.getAllAuthors.map((author) => (
            <div key={author.id} className="author-wrap">
              <div className="all-wrap">
                <h5>Authors</h5>
                <div
                  className="clickable-name"
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
              <div className="all-wrap">
                <h5>Book List</h5>
                {author.books &&
                  author.books.map((book, index) => (
                    <div key={index}>
                      <div>
                        <strong>Title:</strong> {book.title}
                      </div>
                      <div>
                        <strong>Published:</strong> {book.published}
                      </div>
                      <div>
                        <strong>Genre:</strong> {book.genre}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthorList;

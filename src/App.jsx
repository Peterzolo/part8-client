import React from "react";
import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  console.log("DATA", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>List of Books</h1>
      <ul>
        {data.allBooks.map((book) => (
          <li key={book.id}>
            <strong>Title:</strong> {book.title}, <strong>Author:</strong>{" "}
            {book.author}, <strong>Published:</strong> {book.published}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import React from "react";
import { gql, useQuery } from "@apollo/client";
import BookList from "./components/book/BookList";

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

  return (
    <div className="container">
      <BookList data={data} error={error} loading={loading} />
    </div>
  );
};

export default App;

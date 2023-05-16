import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const EDIT_AUTHOR = gql`
  mutation EditAuthor($id: ID!, $born: Int!) {
    editAuthor(id: $id, born: $born) {
      name
      born
      bookCount
      id
    }
  }
`;

const EditAuthor = ({ authorId }) => {
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { id: authorId, born: parseInt(born) } })
      .then((response) => {
        // Handle successful mutation
        console.log("Author's born year updated successfully:", response);
      })
      .catch((error) => {
        // Handle mutation error
        console.error("Failed to update author's born year:", error);
      });
  };

  return (
    <div>
      <h2>Edit Author</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="born">Born:</label>
        <input
          type="number"
          id="born"
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditAuthor;

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($authorInput: AuthorInput!) {
    createAuthor(authorInput: $authorInput) {
      _id
      name
      username
      born
    }
  }
`;

const CreateAuthor = () => {
  const [authorInput, setAuthorInput] = useState({
    name: "",
    username: "",
    password: "",
    born: 0,
  });

  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    onCompleted: () => {
      // Reset the form after successful creation
      setAuthorInput({
        name: "",
        username: "",
        password: "",
        born: 0,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAuthor({ variables: { authorInput } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "born" ? parseInt(value) : value;
    setAuthorInput((prevInput) => ({
      ...prevInput,
      [name]: parsedValue,
    }));
  };

  return (
    <div>
      <h2>Add Author</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={authorInput.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={authorInput.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={authorInput.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Born:
          <input
            type="number"
            name="born"
            value={authorInput.born || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Add Author
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred while adding an author: {error.message}</p>}
    </div>
  );
};

export default CreateAuthor;

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import "./Author.css";

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
    <div className="container">
      <form onSubmit={handleSubmit} className="form-wrap">
        <h2 className="add-title">Add Register</h2>
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Name"
          value={authorInput.name}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="text"
          name="username"
          placeholder="Username"
          value={authorInput.username}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={authorInput.password}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Born year"
          name="born"
          value={authorInput.born || ""}
          onChange={handleChange}
        />
        <button className="add-btn" type="submit" disabled={loading}>
          Add Author
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred while adding an author: {error.message}</p>}
    </div>
  );
};

export default CreateAuthor;

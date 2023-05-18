import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import "./Author.css";

const LOGIN_AUTHOR = gql`
  mutation CreateAuthor($authorInput: AuthorInput!) {
    createAuthor(authorInput: $authorInput) {
      username
      password
    }
  }
`;

const LoginAuthor = () => {
  const [authorInput, setAuthorInput] = useState({
    username: "",
    password: "",
  });

  const [LoginAuthor, { loading, error }] = useMutation(LOGIN_AUTHOR, {
    onCompleted: () => {
      // Reset the form after successful creation
      setAuthorInput({
        username: "",
        password: "",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginAuthor({ variables: { authorInput } });
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
        <h2 className="add-title">Login</h2>
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

        <button className="add-btn" type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred while adding an author: {error.message}</p>}
    </div>
  );
};

export default LoginAuthor;

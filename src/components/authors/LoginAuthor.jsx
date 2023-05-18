import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import "./Author.css";

const LOGIN_AUTHOR = gql`
  mutation LoginAuthor($loginInput: LoginInput!) {
    loginAuthor(loginInput: $loginInput) {
      name
      token
    }
  }
`;

const LoginAuthor = () => {
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginAuthor, { loading, error, data }] = useMutation(LOGIN_AUTHOR, {
    onCompleted: (data) => {
      setLoginInput({
        username: "",
        password: "",
      });
      localStorage.setItem("token", data.loginAuthor.token);
      localStorage.setItem("author-name", data.loginAuthor.name);
      setIsLoggedIn(true);
    },
  });
  console.log("DATA", data);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAuthor({ variables: { loginInput } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("author-name");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="container">
        <h2 className="add-title">You are logged in!</h2>
        <button className="add-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-wrap">
        <h2 className="add-title">Login</h2>
        <input
          className="form-input"
          type="text"
          name="username"
          placeholder="Username"
          value={loginInput.username}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={loginInput.password}
          onChange={handleChange}
        />

        <button className="add-btn" type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred while logging in: {error.message}</p>}
    </div>
  );
};

export default LoginAuthor;

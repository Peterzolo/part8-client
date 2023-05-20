import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import "./Author.css";
import { useNavigate } from "react-router-dom";

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
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [loginAuthor, { loading, error }] = useMutation(LOGIN_AUTHOR, {
    onCompleted: (data) => {
      setLoginInput({
        username: "",
        password: "",
      });
      localStorage.setItem("token", data.loginAuthor.token);
      // localStorage.setItem("author-name", data.loginAuthor.name);
      setIsLoggedIn(true);
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAuthor({ variables: { loginInput } });
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prevInput) => ({
      ...prevInput,
      [name]: value,
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

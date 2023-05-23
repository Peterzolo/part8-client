// auth.js

const AUTH_TOKEN_KEY = "token";
const AUTHOR_NAME_KEY = "author-name";

export const setAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthorName = (authorName) => {
  localStorage.setItem(AUTHOR_NAME_KEY, authorName);
};

export const getAuthorName = () => {
  return localStorage.getItem(AUTHOR_NAME_KEY);
};

export const clearAuthData = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTHOR_NAME_KEY);
};

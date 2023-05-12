import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createAnecdote = async (anecdoteObject) => {
  const response = await axios.post(baseUrl, anecdoteObject);
  console.log("RESPONSE------", response.data);
  return response.data;
};

export const voteAnecdoteAction = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

import { createSlice } from "@reduxjs/toolkit";
import { voteAnecdoteAction } from "../../../services/anecdoteService";

export const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = {
  anecdotes: [],
  filter: "",
};

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    fetchAnecdotes: (state, action) => {
      state.anecdotes = action.payload;
    },
    voteAnecdote: (state, action) => {
      const id = action.payload.id;
      const anecdoteToVote = state.anecdotes.find(
        (anecdote) => anecdote.id === id
      );
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
      voteAnecdoteAction(anecdoteToVote);
    },

    addAnecdote: (state, action) => {
      state.content = action.payload;
    },
    filterAnecdote: (state, action) => {
      state.filter = action.payload.filter;
    },
  },
});

export const { fetchAnecdotes, voteAnecdote, addAnecdote, filterAnecdote } =
  anecdotesSlice.actions;

export default anecdotesSlice.reducer;

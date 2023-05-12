import { combineReducers } from "redux";
import anecdoteReducer from "./anecdote/anecdoteReducer";
import notificationReducer from "./notification/notificationReducer";

export const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
});

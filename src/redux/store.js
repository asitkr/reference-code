import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";

// Combine all slices
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

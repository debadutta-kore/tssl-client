import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usecaseReducer from "./features/usecaseSlice.js";
import authReducer from "./features/useAuthSlice.js";
import usersReducer from "./features/usersSlice.js";
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  usecases: usecaseReducer,
});
export const store = configureStore({ reducer: rootReducer });

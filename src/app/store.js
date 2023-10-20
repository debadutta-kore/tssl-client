import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usecaseReducer from "./features/usecaseSlice";
import authReducer from "./features/useAuthSlice";
import usersReducer from "./features/usersSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  usecases: usecaseReducer,
});
export const store = configureStore({ reducer: rootReducer });

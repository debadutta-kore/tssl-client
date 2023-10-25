import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usecaseReducer from "./features/usecaseSlice";
import authReducer from "./features/authSlice";
import usersReducer from "./features/usersSlice";
import controlReducer from "./features/controlSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  control: controlReducer,
  usecases: usecaseReducer,
});
export const store = configureStore({ reducer: rootReducer });

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";

export const createUser = createAsyncThunk(
  "createUser",
  async (arg, thunkApi) => {
    const res = await request({
      url: "/user/add",
      method: "POST",
      data: {
        email: arg.email,
        password: arg.password,
        name: arg.name,
        role: "user",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } else {
      return thunkApi.rejectWithValue("not able to fetch all user");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { users } = getState();
      // eslint-disable-next-line no-prototype-builtins
      if (
        typeof arg === "object" &&
        ["email", "password", "name"].every((key) => arg.hasOwnProperty(key)) &&
        !users.isLoading
      ) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (arg, thunkApi) => {
    const res = await request({
      url: "/user/delete",
      method: "DELETE",
      data: { id: arg.userId },
    });
    if (res.status === 200) {
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } else {
      return thunkApi.rejectWithValue("unable to delete user");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { users } = getState();
      if (
        typeof arg === "object" &&
        arg.userId &&
        users.users.length > 0 &&
        !users.isLoading
      ) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const fetchAllUser = createAsyncThunk(
  "fetchAllUsers",
  async (arg, thunkApi) => {
    const res = await request({
      url: "/user/all",
      method: "POST",
      data: { role: "user" },
    });
    if (res.status === 200) {
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } else {
      return thunkApi.rejectWithValue("not able to fetch all user");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { users } = getState();
      return users.users.length === 0 && !users.isLoading;
    },
  }
);

const initialState = {
  isLoading: false,
  users: [],
};
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {

      state.users = state.users.filter(
        (user) => user.id !== action.meta.arg.userId
      );
      state.isLoading = false;
    });
    builder.addMatcher(
      isAnyOf(createUser.rejected, fetchAllUser.rejected, deleteUser.rejected),
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(createUser.pending, deleteUser.pending, fetchAllUser.pending),
      (state) => {
        state.isLoading = true;
      }
    );
  },
});

export default userSlice.reducer;

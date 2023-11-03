import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";
import { requestErrorHandler } from "../../utilities";

export const createUser = createAsyncThunk(
  "createUser",
  async (arg, thunkApi) => {
    return await request({
      url: "/account/user",
      method: "POST",
      data: {
        email: arg.email,
        password: arg.password,
        name: arg.name,
      },
    })
      .then((res) => thunkApi.fulfillWithValue(res.data))
      .catch(requestErrorHandler.bind(null, thunkApi));
  },
  {
    condition: (arg, { getState }) => {
      const { users } = getState();
      if (
        typeof arg === "object" &&
        arg.email &&
        arg.password &&
        arg.name &&
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
    return await request({
      url: `/account/user/${arg.userId}`,
      method: "DELETE",
    })
      .then(() => thunkApi.fulfillWithValue())
      .catch(requestErrorHandler.bind(null, thunkApi));
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
    return await request({
      url: "/account/user",
      method: "GET",
    })
      .then((res) => thunkApi.fulfillWithValue(res.data))
      .catch(requestErrorHandler.bind(null, thunkApi));
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
  reducers: {
    resetUsers() {
      return initialState;
    },
  },
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

    builder.addCase("reset", () => {
      return initialState;
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

export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;

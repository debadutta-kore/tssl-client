import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";

export const createUser = createAsyncThunk(
  "createUser",
  async (arg, thunkApi) => {
    try {
      const res = await request({
        url: "/account/user",
        method: "POST",
        data: {
          email: arg.email,
          password: arg.password,
          name: arg.name
        },
      });
      if (res.status === 200) {
        return thunkApi.fulfillWithValue(res.data);
      } else {
        return thunkApi.rejectWithValue("not able to fetch all user");
      }
    } catch (err) {
      return thunkApi.rejectWithValue('something went wrong')
    }
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
    try {
      const res = await request({
        url: `/account/user/${arg.userId}`,
        method: "DELETE",
      });
      if (res.status === 204) {
        return thunkApi.fulfillWithValue();
      } else {
        return thunkApi.rejectWithValue("unable to delete user");
      }
    } catch (err) {
      return thunkApi.rejectWithValue('something went wrong');
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
    try {
      const res = await request({
        url: "/account/user",
        method: "GET",
      });
      if (res.status === 200) {
        return thunkApi.fulfillWithValue(res.data);
      } else {
        return thunkApi.rejectWithValue("not able to fetch all user");
      }
    } catch (err) {
      return thunkApi.rejectWithValue('something went wrong');
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
  reducers:{
    resetUsers(){
      return initialState;
    }
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

export const {resetUsers} = userSlice.actions;

export default userSlice.reducer;

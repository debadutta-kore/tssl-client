import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";
import { requestErrorHandler } from "../../utilities";

export const login = createAsyncThunk("login", async (arg, thunkApi) => {
  return await request(arg)
    .then((res) => thunkApi.fulfillWithValue(res.data))
    .catch(requestErrorHandler.bind(null, thunkApi));
});

export const logout = createAsyncThunk(
  "logout",
  async (arg, thunkApi) => {
    return await request({
      url: `/auth/logout`,
      method: "DELETE",
    })
      .then(() => {
        thunkApi.dispatch({ type: "reset" });
        return thunkApi.fulfillWithValue();
      })
      .catch(requestErrorHandler.bind(null, thunkApi));
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.isLoading && auth.isLogin) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const loginWithSession = createAsyncThunk(
  "loginWithSession",
  async (arg, thunkApi) => {
    return await request({
      url: "/auth/session",
      method: "GET",
    })
      .then((res) => thunkApi.fulfillWithValue(res.data))
      .catch(requestErrorHandler.bind(null, thunkApi));
  },
  {
    condition(_, { getState }) {
      const { auth } = getState();
      if (!auth.isLogin && !auth.isLoading) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const updateSession = createAsyncThunk(
  "updateSession",
  async (userId, thunkApi) => {
    return await request({
      url: "/auth/session",
      method: "PUT",
      data: { userId },
    })
      .then((res) => thunkApi.fulfillWithValue(res.data))
      .catch(requestErrorHandler.bind(null, thunkApi));
  },
  {
    condition(arg, { getState }) {
      const { auth } = getState();
      if (arg && !auth.isLoading && !auth.choosedUser) {
        return true;
      } else {
        return false;
      }
    },
  }
);

const initialState = {
  role: "",
  isLogin: false,
  isLoading: false,
  choosedUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.role = action.payload.role;
      state.isLogin = true;
      state.isLoading = false;
    });

    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });

    builder.addCase(loginWithSession.fulfilled, (state, action) => {
      state.role = action.payload.role;
      state.isLoading = false;
      state.isLogin = true;
      if (action.payload.role === "admin") {
        state.choosedUser = action.payload.isChoosedUser;
      }
    });

    builder.addCase(updateSession.fulfilled, (state) => {
      state.isLoading = false;
      state.choosedUser = true;
    });

    builder.addCase("reset", () => {
      return initialState;
    });

    builder.addMatcher(
      isAnyOf(
        login.rejected,
        logout.rejected,
        loginWithSession.rejected,
        updateSession.rejected
      ),
      (state) => {
        state.isLoading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        login.pending,
        logout.pending,
        loginWithSession.pending,
        updateSession.pending
      ),
      (state) => {
        state.isLoading = true;
      }
    );
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";
import { requestErrorHandler } from "../../utilities";

export const fetchControl = createAsyncThunk(
  "fetchControls",
  async (arg, thunkApi) => {
    return await request({
      url: "/account/details",
      method: "GET",
    }).then((res)=> thunkApi.fulfillWithValue(res.data))
    .catch(requestErrorHandler.bind(null, thunkApi))
  },
  {
    condition(arg, { getState }) {
      const { control } = getState();
      if (!control.id && !control.isLoading) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const updateAccess = createAsyncThunk(
  "updateAccess",
  async (arg, thunkApi) => {
    return await request({
      url: "/account/access",
      method: "PUT",
      data: {
        enable: arg.enable ? 1 : 0,
      },
    }).then(()=>thunkApi.fulfillWithValue())
    .catch(requestErrorHandler.bind(null, thunkApi))
  },
  {
    condition(arg) {
      if (arg && typeof arg.enable !== "undefined") {
        return true;
      } else {
        return false;
      }
    },
  }
);

const initialState = {
  isLoading: false,
};

const control = createSlice({
  name: "control",
  initialState,
  reducers: {
    setControl(state, action){
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.enable = action.payload.enable;
    },
    resetControl() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchControl.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoading = false;
      state.enable = action.payload.enable;
    });
    builder.addCase(updateAccess.fulfilled, (state, action) => {
      state.isLoading = false;
      state.enable = action.meta.arg.enable ? 1 : 0;
    });

    builder.addCase("reset", () => {
        return initialState;
    });

    builder.addMatcher(
      isAnyOf(fetchControl.pending, updateAccess.pending),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(fetchControl.rejected, fetchControl.rejected),
      (state) => {
        state.isLoading = false;
      }
    );
  },
});

export const { resetControl, setControl } = control.actions;
export default control.reducer;

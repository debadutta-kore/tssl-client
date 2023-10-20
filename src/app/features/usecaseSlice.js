import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";

export const addUsecase = createAsyncThunk(
  "addUsecase",
  async (arg, thunkApi) => {
    const { auth } = thunkApi.getState();
    const res = await request({
      url: "/usecase/add",
      method: "POST",
      data: {
        usecaseId: arg.usecaseId,
        userId: auth.userId,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } else {
      return thunkApi.rejectWithValue("Unable to add usecase");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { usecases } = getState();
      if (arg && arg.usecaseId && !usecases.isLoading) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const deleteUsecase = createAsyncThunk(
  "deleteUsecase",
  async (arg, thunkApi) => {
    const res = await request({
      url: "/usecase/delete",
      method: "DELETE",
      data: {
        id: arg.id,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } else {
      return thunkApi.rejectWithValue("Unable to delete this");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { usecases } = getState();
      if (arg && arg.id && !usecases.isLoading) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const updateUsecase = createAsyncThunk(
  "updateUsecase",
  async (arg, thunkApi) => {
    const { auth } = thunkApi.getState();
    const res = await request({
      url: "/usecase/update",
      method: "PUT",
      data: {
        usecaseId: arg.usecaseId,
        userId: auth.userId,
        enable: arg.enable ? 1 : 0,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } else {
      return thunkApi.rejectWithValue("usecase is not updated yet");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { usecases } = getState();
      if (arg && arg.usecaseId && arg.enable && !usecases.isLoading) {
        return true;
      } else {
        return false;
      }
    },
  }
);

export const fetchAllUsecases = createAsyncThunk(
  "fetchAllUsecases",
  async (arg, thunkApi) => {
    const { auth } = thunkApi.getState();
    const res = await request({
      url: "/usecase/all",
      method: "POST",
      data: {
        userId: auth.userId,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return thunkApi.fulfillWithValue(data);
    } else {
      return thunkApi.rejectWithValue("unable to fetch data");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { usecases } = getState();
      if (usecases.usecases.length === 0 && !usecases.isLoading) {
        return true;
      } else {
        return false;
      }
    },
  }
);

const initialState = {
  isLoading: false,
  usecases: [],
};

const usecaseSlice = createSlice({
  name: "usecases",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addUsecase.fulfilled, (state, action) => {
      state.usecases.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteUsecase.fulfilled, (state, action) => {
      state.usecases = state.usecases.filter(
        (usecase) => usecase.id !== action.meta.arg.id
      );
      state.isLoading = false;
    });
    builder.addCase(updateUsecase.fulfilled, (state, action) => {
      state.usecases = state.usecases.map((usecase) => {
        if (usecase.usecaseId === action.meta.arg.usecaseId) {
          return {
            ...usecase,
            enable: action.meta.arg.enable,
          };
        } else {
          return usecase;
        }
      });
      state.isLoading = false;
    });
    builder.addCase(fetchAllUsecases.fulfilled, (state, action) => {
      state.usecases = action.payload;
      state.isLoading = false;
    });
    builder.addMatcher(
      isAnyOf(
        addUsecase.rejected,
        deleteUsecase.rejected,
        updateUsecase.rejected,
        fetchAllUsecases.rejected
      ),
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(
        addUsecase.pending,
        deleteUsecase.pending,
        updateUsecase.pending,
        fetchAllUsecases.pending
      ),
      (state) => {
        state.isLoading = true;
      }
    );
  },
});

export default usecaseSlice.reducer;

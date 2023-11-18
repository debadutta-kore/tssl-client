import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";
import {
  generateUnrepeatedRandomNumbers,
  requestErrorHandler,
  usecaseBackgrounds,
} from "../../utilities";
const randomNumberGenerator = generateUnrepeatedRandomNumbers(
  0,
  usecaseBackgrounds.length - 1
);

export const addUsecase = createAsyncThunk(
  "addUsecase",
  async (arg, thunkApi) => {
    return await request({
      url: "/usecase/add",
      method: "POST",
      data: {
        usecaseId: arg.usecaseId,
      },
    })
      .then((res) => thunkApi.fulfillWithValue(res.data))
      .catch(requestErrorHandler.bind(null, thunkApi));
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
    return await request({
      url: `/usecase/delete/${arg.id}`,
      method: "DELETE",
    })
      .then(() => thunkApi.fulfillWithValue())
      .catch(requestErrorHandler.bind(null, thunkApi));
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

export const fetchAllUsecases = createAsyncThunk(
  "fetchAllUsecases",
  async (_, thunkApi) => {
    return await request({
      url: "/usecase/all",
      method: "GET",
    })
      .then((res) => thunkApi.fulfillWithValue(res.data))
      .catch(requestErrorHandler.bind(null, thunkApi));
  },
  {
    condition: (_, { getState }) => {
      const { usecases } = getState();
      if (usecases.usecases.length === 0 && !usecases.isLoading) {
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
    return await request({
      url: "/usecase/update",
      method: "PUT",
      data: { enable: arg.enable ? 1 : 0, usecaseId: arg.id },
    })
      .then((res) => thunkApi.fulfillWithValue(res.data))
      .catch(requestErrorHandler.bind(null, thunkApi));
  },
  {
    condition(arg) {
      if (arg && arg.id && typeof arg.enable !== "undefined") {
        return true;
      } else {
        return false;
      }
    },
  }
);

const initialState = {
  isLoading: false,
  usecases: []
};

const usecaseSlice = createSlice({
  name: "usecases",
  initialState,
  reducers: {
    resetUsecase() {
      return {
        isLoading: false,
        usecases: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUsecase.fulfilled, (state, action) => {
      state.usecases.push({
        ...action.payload,
        theme: usecaseBackgrounds[randomNumberGenerator.next().value],
      });
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
        if (usecase.usecaseId === action.meta.arg.id) {
          usecase.enable = action.meta.arg.enable ? 1 : 0;
        }
        return usecase;
      });
      state.isLoading = false;
    });

    builder.addCase(fetchAllUsecases.fulfilled, (state, action) => {
      state.usecases = action.payload.map((usecase) => ({
        ...usecase,
        theme: usecaseBackgrounds[randomNumberGenerator.next().value],
      }));
      state.isLoading = false;
    });

    builder.addCase("reset", () => {
      return initialState;
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

export const { resetUsecase, saveAvailableUsecase } = usecaseSlice.actions;

export default usecaseSlice.reducer;

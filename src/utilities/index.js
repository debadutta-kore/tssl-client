export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 *
 * @param {AxiosError} err
 * @param {*} thunkApi
 * @returns
 */
export const requestErrorHandler = (thunkApi, err) => {
  if (err.response) {
    if (err.response.status === 401) {
      thunkApi.dispatch({ type: "reset" });
      return thunkApi.rejectWithValue({
        status: 401,
        message: "Session expired. Please log in again to continue.",
      });
    } else {
      return thunkApi.rejectWithValue({
        status: err.response.status,
        data: err.response.data,
        message: "Oops! Something went wrong try again",
      });
    }
  } else if (err.request && err.code === "ERR_NETWORK") {
    return thunkApi.rejectWithValue({
      status: 400,
      message: "Please connect your device with internet",
    });
  } else {
    return thunkApi.rejectWithValue({
      status: 500,
      message: "Something went wrong",
    });
  }
};

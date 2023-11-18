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
  } else {
    return thunkApi.rejectWithValue({
      status: 500,
      message: "Something went wrong",
    });
  }
};

export const getPdfNameFromUrl = (pdfUrl) => {
  console.log(pdfUrl);
  const url = new URL(pdfUrl);
  const pathSegments = url.pathname.split("/");

  for (let i = pathSegments.length - 1; i >= 0; i--) {
    if (pathSegments[i].endsWith(".pdf")) {
      return pathSegments[i];
    }
  }

  return "";
};

export const generateUnrepeatedRandomNumbers = function* (min, max) {
  const numbers = Array.from({ length: max - min + 1 }, (_, index) => index + min);

  while (numbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    yield numbers.splice(randomIndex, 1)[0];
  }
  yield* generateUnrepeatedRandomNumbers(min, max);
}

export const usecaseBackgrounds = [
  "#FAC515",
  "#85E13A",
  "#A48AFB",
  "#2ED3B7",
  "#53B1FD",
  "#F38744",
];

export const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  let formattedTime = '';
  if (!hours) {
    formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return formattedTime;
};
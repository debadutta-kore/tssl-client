import axios from "axios";

const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  validateStatus: (status)=> (status <= 404),
  withCredentials: true
});
/**
 * 
 * @param {import("axios").AxiosRequestConfig} config
 */
const request = (config) => axiosRequest(config);
export default request;
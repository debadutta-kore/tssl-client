import axios from "axios";
const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || import.meta.env.VITE_BASEPATH + 'api',
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  validateStatus: (status)=> (status < 300),
  withCredentials: true
});
/**
 * 
 * @param {import("axios").AxiosRequestConfig} config
 */
const request = (config) => axiosRequest(config);
export default request;
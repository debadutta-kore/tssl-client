import axios from "axios";

const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});
/**
 * 
 * @param {import("axios").AxiosRequestConfig} payload 
 */
function request(payload) {
  return axiosRequest(payload)
}
export default request;
const serverUrl = import.meta.env.VITE_SERVER_URL;
/**
 * 
 * @param {string} url 
 * @param {'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'} method 
 * @param {Object} data
 * @returns 
 */
function request({url, method, data }) {
    return fetch(serverUrl+url, {
        method,
        headers:{
          'Content-Type': 'application/json',
          Accept: 'applicaiton/json'
        },
        body: data && JSON.stringify(data),
        withCredentials: true,
        credentials: 'include'
      })
}
export default request;
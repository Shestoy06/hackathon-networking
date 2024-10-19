import axios, {CreateAxiosDefaults} from "axios";

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_REACT_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axiosInstance = axios.create(options)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance
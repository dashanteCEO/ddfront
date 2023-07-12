import axios from "axios";
import { base_url } from "./config";
const { NODE_ENV } = process.env;
console.log(base_url);
const axiosInstance = axios.create(
  {
  baseURL:
    NODE_ENV === "development"
      ? "http://localhost:6969"
      : "https://ddbackend-hctu.onrender.com",
  withCredentials: true,
});


console.log(axiosInstance.defaults);
export default axiosInstance;
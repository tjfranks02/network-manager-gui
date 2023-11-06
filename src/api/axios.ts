/**
 * Creates an instance of axios to use globally.
 * 
 * Has some properties pre-configured on it.
 */
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
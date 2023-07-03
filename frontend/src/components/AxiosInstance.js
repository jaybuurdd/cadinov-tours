import axios from "axios"

console.log("env: ", process.env.NODE_ENV)
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://cadinov-api.onrender.com' 
        : 'http://localhost:5000'
});

export default axiosInstance;

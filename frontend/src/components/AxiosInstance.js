import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://cadinov-api.onrender.com' 
        : 'http://localhost:5000'
});

export default axiosInstance;

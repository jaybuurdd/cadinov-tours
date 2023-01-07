import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://cadinov-api.onrender.com/'
});

export default axiosInstance
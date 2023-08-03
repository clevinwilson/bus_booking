import axios from 'axios';

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return instance;
}

export default axiosInstance;
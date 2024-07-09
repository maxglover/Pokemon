import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',  // Ensure this matches the backend URL and port
});

export default api;

import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchStocks = () => api.get('/stocks');
// Add more API calls as needed

export default api;
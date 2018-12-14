import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1025'
});

export default api;

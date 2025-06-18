import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true  // ✅ allows sending cookies/auth headers in future
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.68.110:3000/api',
});

export default api;

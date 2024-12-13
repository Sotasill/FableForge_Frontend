import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Добавим логирование для отладки
axiosInstance.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.log('Response Error:', error);
    return Promise.reject(error);
  }
); 
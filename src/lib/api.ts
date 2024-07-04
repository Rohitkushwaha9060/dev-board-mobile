import axios from 'axios';

export const ApiOne = axios.create({
  baseURL: 'https://dev-board-server.onrender.com/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

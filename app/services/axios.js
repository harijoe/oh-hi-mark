import axios from 'axios';
import { AWS_ENDPOINT } from '../constants/Endpoints';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: AWS_ENDPOINT
});

export const initAxios = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default instance;

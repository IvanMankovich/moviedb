import axios from 'axios';
import { CheckTokensResponse } from '../components/types';

export const API_URL = import.meta.env.VITE_API_URL;

const authInterceptor = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

authInterceptor.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

authInterceptor.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<CheckTokensResponse>(`${API_URL}/tokens`, {
          withCredentials: true,
        });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        return authInterceptor.request(originalRequest);
      } catch (e) {
        console.error('e');
      }
    }
    throw error;
  },
);

export { authInterceptor };

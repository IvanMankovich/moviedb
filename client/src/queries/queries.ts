import axios from 'axios';

export const getPerson = (id?: string) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/people/${id}`);
};

export const getPeople = (q: string) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/people${q ? `?${q}` : ''}`);
};

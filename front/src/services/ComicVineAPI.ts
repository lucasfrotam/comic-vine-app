import axios from 'axios';

const API_URL = 'http://localhost:8080';
const API_KEY = 'f6df5909974d1eccd9728ffe69113d5a88dd9d25';
axios.defaults.baseURL =  API_URL;

export const getComicData = (limit = 20, skip = 0) => {
  return axios.get<Characters>(
    `/characters/?api_key=${API_KEY}&format=json&limit=${limit}&offset=${skip}`
  );
}

export const searchCharacter = (name: string) => {
  if (!name) return Promise.reject('Missing name');
  return axios.get<Characters>(`/characters/?api_key=${API_KEY}&format=json&filter=name:${name}`);
}
import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://65a04dee600f49256fafd1ae.mockapi.io/products';

const api: AxiosInstance = axios.create({
  baseURL,
});

export const getProductById = (id: string | number) => {
  return api.get(`/${id}`);
};

export default api;
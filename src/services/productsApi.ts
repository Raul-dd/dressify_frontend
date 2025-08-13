import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = 'http://127.0.0.1:8000/api/products'; // API PRODUCTS

export const getProducts = async (params?: Record<string, any>) => {
  const res = await axios.get(`${API_URL}/products`, { params });
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

export const createProduct = async (data: FormData) => {
  const res = await axios.post(`${API_URL}/products`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateProduct = async (id: string, data: FormData) => {
  const res = await axios.post(`${API_URL}/products/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${API_URL}/products/${id}`);
  return res.data;
};

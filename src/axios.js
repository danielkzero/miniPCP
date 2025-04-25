// src/axios.js
import axios from 'axios'; // Importa a instância configurada

// Cria uma instância do Axios
const instance = axios.create({
  baseURL: '', // Substitua pela URL da sua API
});

// Intercepta todas as requisições e adiciona o token ao cabeçalho Authorization
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
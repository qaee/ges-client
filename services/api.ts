import axios from 'axios';
import { AuthResponse, LoginData, RegisterData, Product } from '@/types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const productService = {
  getActiveProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/public');
    return response.data;
  },

  getProductById: async (id: string | number): Promise<Product> => {
    const response = await api.get<Product>(`/products/public/${id}`);
    return response.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/public/search?query=${query}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/public/category/${category}`);
    return response.data;
  },

  createProduct: async (product: Partial<Product>): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getMerchantProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/merchant');
    return response.data;
  },
};

export const aiExtractionService = {
  getSupportedFileTypes: async () => {
    const response = await api.get('/ai-extraction/supported-types');
    return response.data;
  },

  uploadAndProcess: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/ai-extraction/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  validateExtraction: async (extractedProducts: any[]) => {
    const response = await api.post('/ai-extraction/validate-extraction', extractedProducts);
    return response.data;
  },

  createProductsFromExtraction: async (extractedProducts: any[]) => {
    const response = await api.post('/ai-extraction/create-products', extractedProducts);
    return response.data;
  },
};

export default api;
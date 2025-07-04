import axios from 'axios';

// Use relative path for API calls - Vite proxy will handle routing to backend
const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable credentials for CORS
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillswap_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/user/profile'),
  updateProfile: (updates) => api.put('/user/profile', updates),
};

// Progress API
export const progressAPI = {
  getProgress: () => api.get('/progress'),
  completeLesson: (data) => api.post('/progress/complete-lesson', data),
};

// Matching API
export const matchingAPI = {
  getMatches: () => api.get('/matches'),
};

// Messages API
export const messagesAPI = {
  getMessages: (userId) => api.get(`/messages/${userId}`),
  sendMessage: (data) => api.post('/messages', data),
};

// Forum API
export const forumAPI = {
  getPosts: () => api.get('/forum'),
  createPost: (data) => api.post('/forum', data),
};

export default api;
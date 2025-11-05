import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Health API
export const healthAPI = {
  getAll: (params) => api.get('/health', { params }),
  getPredictions: () => api.get('/health/predictions'),
  getAlerts: () => api.get('/health/alerts'),
  getStatsByRegion: (region) => api.get(`/health/stats/${region}`),
  submit: (data) => api.post('/health', data)
};

// Marine API
export const marineAPI = {
  getAll: (params) => api.get('/marine', { params }),
  getEcosystem: () => api.get('/marine/ecosystem'),
  getBiodiversity: () => api.get('/marine/biodiversity'),
  getLocations: () => api.get('/marine/locations'),
  runScenario: (data) => api.post('/marine/scenario', data)
};

// Circular Economy API
export const circularAPI = {
  getAll: (params) => api.get('/circular', { params }),
  getWasteStreams: () => api.get('/circular/waste-streams'),
  getRecommendations: () => api.get('/circular/recommendations'),
  getMetrics: () => api.get('/circular/metrics'),
  optimize: (data) => api.post('/circular/optimize', data)
};

// Policy API
export const policyAPI = {
  getAll: (params) => api.get('/policy', { params }),
  getById: (id) => api.get(`/policy/${id}`),
  create: (data) => api.post('/policy', data),
  run: (id) => api.post(`/policy/${id}/run`),
  approve: (id) => api.put(`/policy/${id}/approve`)
};

// Data API
export const dataAPI = {
  getStatus: () => api.get('/data/status'),
  getStats: () => api.get('/data/stats'),
  getQuality: () => api.get('/data/quality')
};

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile')
};

export default api;

import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Simulated latency
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env['NEXT_PUBLIC_API_BASE_URL'] || 'http://localhost:4000/api/v1';

let client: AxiosInstance | null = null;

export function getApiClient(): AxiosInstance {
  if (client) return client;

  client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
}



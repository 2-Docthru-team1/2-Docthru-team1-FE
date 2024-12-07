import axios, { type InternalAxiosRequestConfig } from 'axios';
import { access } from 'fs';
import https from 'https';
import useStore from '@/store/store';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 30000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      data: config.data
    });
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  res => res,
  async err => {
    const request = err.config;
    if (err.response?.status === 401 && !request._retry) {
      request._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('Not refreshToken');

        const refreshInstance = axios.create({
          baseURL: `${BASE_URL}`,
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        });

        const response = await refreshInstance.post('/auth/refresh');
        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        request.headers.Authorization = `Bearer ${accessToken}`;
        return instance(request);
      } catch (refreshError) {
        const { logout } = useStore.getState();
        logout();
        window.location.href = '/';
      }
    } else if (err.response?.status !== 401) {
      console.error(err);
    }
    return Promise.reject(err);
  }
);

interface CustomAxiosRequestConfig {
  params?: object;
}

export async function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = params;
  return instance.get(url, config);
}
export async function postRequest(url: string, body: object = {}) {
  return instance.post(url, body);
}

export async function patchRequest(url: string, body: object = {}) {
  return instance.patch(url, body);
}

export async function deleteRequest(url: string) {
  return instance.delete(url);
}

export async function putRequest(url: string, data: Blob | File, headers: Record<string, string> = {}): Promise<any> {
  try {
    const response = await axios.put(url, data, {
      headers: {
        ...headers,
        'Content-Type': data.type || 'application/octet-stream'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

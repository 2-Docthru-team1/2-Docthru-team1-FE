import axios, { type InternalAxiosRequestConfig } from 'axios';
import https from 'https';
import useStore from '@/store/store';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
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
      const refreshInstance = axios.create({
        baseURL: `${BASE_URL}`,
        withCredentials: true
      });

      try {
        await refreshInstance.post('/auth/refresh', undefined);
        request._retry = true;
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

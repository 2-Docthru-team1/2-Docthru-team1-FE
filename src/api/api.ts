import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000
});
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new AxiosHeaders(config.headers);
        headers.set('Authorization', `Bearer ${token}`);
        config.headers = headers;
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
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await instance.post('/auth/refresh', { refreshToken });
        request._retry = true;
        return instance(request);
      } else {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(err);
  }
);
interface CustomAxiosRequestConfig {
  params?: object;
}
export function getRequest(url: string, params: object = {}) {
  const config: CustomAxiosRequestConfig = {
    params
  };
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
